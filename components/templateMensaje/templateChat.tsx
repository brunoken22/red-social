'use client';
import { TemplSns, Menssage } from './styled';
import FotoPerfil from '@/ui/FotoPerfil';
import { Input } from '@/ui/input';
import CloseSVG from '@/ui/icons/close.svg';
import { Button } from '../publicar/styled';
import Link from 'next/link';
import { EnviarMessage } from '@/lib/hook';
import { useEffect, useRef, useState } from 'react';
import { rtdb } from '@/lib/firebase';
import { ref, onValue, update, get } from 'firebase/database';
import Linkify from '@/utils/formtText';
import { MessageUserChat } from '.';

export default function TemplateChat({
  dataMensajeUser,
  id,
  close,
  connect,
}: {
  dataMensajeUser: MessageUserChat;
  id: number;
  close: () => any;
  connect: boolean;
}) {
  const smsRef: any = useRef(null);
  const [claveMessage, setclaveMessage] = useState('');
  const [messagesAll, setMessagesAll] = useState([]);

  useEffect(() => {
    if (dataMensajeUser) {
      const chatrooms = ref(rtdb, '/rooms/' + dataMensajeUser?.rtdb + '/messages');

      return onValue(chatrooms, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const datas: any = Object.values(valor);
          const claves = Object.keys(valor);
          const ultimoObjeto = claves[claves.length - 1];
          setclaveMessage(ultimoObjeto);
          setMessagesAll(datas);
        } else {
          setMessagesAll([]);
        }
      });
    }
  }, [dataMensajeUser]);

  useEffect(() => {
    if (claveMessage) {
      if (messagesAll) {
        const utlimoMensaje: any = messagesAll[messagesAll.length - 1];

        if (utlimoMensaje?.read == false && utlimoMensaje.id !== id) {
          const chatroomData = ref(
            rtdb,
            '/rooms/' + dataMensajeUser?.rtdb + '/messages/' + claveMessage
          );
          get(chatroomData).then((snap) => {
            if (snap.exists()) {
              update(chatroomData, {
                read: true,
              })
                .then((snap: any) => {
                  return snap;
                })
                .catch((e: any) => {
                  return e;
                });
            }
          });
        }
      }
    }
  }, [claveMessage]);

  useEffect(() => {
    if (!smsRef.current) {
      return;
    }
    const container = smsRef.current as any;
    container.scrollTop = container.scrollHeight;
  }, [messagesAll]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget;

    const messageUser: MessageUserChat = {
      rtdb: dataMensajeUser.rtdb,
      id: dataMensajeUser.id,
      fullName: dataMensajeUser.fullName,
      img: dataMensajeUser.img,
      message: target.message.value,
      read: false,
    };

    const data = await EnviarMessage(messageUser);
    if (data) {
      return (target.message.value = '');
    }
    alert('Error al mandar mensaje');
  };

  return (
    <TemplSns>
      <div className=' flex justify-between border-[1px] border-[#3b3b3b] p-2'>
        <div className='flex items-center gap-4 overflow-hidden'>
          <Link href={'/amigos/' + dataMensajeUser.id + '/' + dataMensajeUser.fullName}>
            <FotoPerfil
              className='w-[40px] h-[40px]'
              img={dataMensajeUser.img || (dataMensajeUser.img == 'null' && '') || ''}
              connect={connect}
            />
          </Link>
          <div className='flex items-center gap-2 overflow-hidden'>
            <h5 className='truncate m-0'>{dataMensajeUser.fullName}</h5>
          </div>
        </div>
        <Button onClick={() => close()}>
          <CloseSVG />
        </Button>
      </div>
      <div className='flex flex-col gap-4 h-full  border-[1px] border-[#3b3b3b]'>
        <div
          className='flex flex-col w-full text-primary gap-2 p-4  overflow-y-auto h-full'
          ref={smsRef}>
          {messagesAll
            ? messagesAll?.map((e: any, p: any) => {
                return (
                  <div
                    key={p}
                    id={e.id}
                    style={{
                      display: 'block',
                      textAlign: e.id == id ? 'end' : 'start',
                    }}>
                    <Menssage isUser={e.id == id ? true : false}>
                      <Linkify text={e.message || ''} />
                    </Menssage>
                  </div>
                );
              })
            : null}
          {messagesAll?.length > 0 && (messagesAll[messagesAll.length - 1] as any).id === id && (
            <p
              className={`text-end  text-[0.8rem] ${
                (messagesAll[messagesAll.length - 1] as any).read ? 'text-light' : 'text-gray-500'
              } -mt-2`}>
              ✔✔ {(messagesAll[messagesAll.length - 1] as any).read ? 'Leido' : 'Sin leer'}
            </p>
          )}
        </div>
        <div>
          <form
            action=''
            onSubmit={handleSubmit}
            className='flex items-center gap-4 p-4 text-secundary max-md:p-2'>
            <Input id='message' type='text' placeholder='Escribe un mensaje' />

            <button
              type='submit'
              id={dataMensajeUser.rtdb}
              className='w-full p-2 bg-light text-primary rounded-md hover:opacity-70 shrink-[5] '>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </TemplSns>
  );
}
