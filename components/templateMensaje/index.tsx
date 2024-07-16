'use client';
import {DivAllChat} from '@/ui/container';
import {
  DivTemMensaje,
  TemplMensaje,
  TemplChat,
  TemplSns,
  Sms,
  Menssage,
  SpanNoti,
} from './styled';
import FotoPerfil from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {ButtonSms} from '@/ui/boton';
import {useRecoilValue} from 'recoil';
import {user, isMenssage, isConnect, User, getAllUsersChat} from '@/lib/atom';
import {useEffect, useRef, useState} from 'react';
import {rtdb} from '@/lib/firebase';
import {ref, onValue, update, get} from 'firebase/database';
import {EnviarMessage} from '@/lib/hook';
import CloseSVG from '@/ui/icons/close.svg';
import {Button} from '../publicar/styled';
import Link from 'next/link';
import {useSearchParams, useRouter} from 'next/navigation';
import {SkeletonMenssage} from '@/ui/skeleton';
type MessageUser = {
  rtdb?: string | undefined;
  message?: string;
  read?: boolean;
  fullName?: string;
  img?: string;
  id?: string;
};
export function TemMensaje() {
  const params = useSearchParams();
  const router = useRouter();
  const dataUser = useRecoilValue(user);
  const dataGetAllUsersChat = useRecoilValue(getAllUsersChat);
  const dataIsConnect = useRecoilValue(isConnect);
  const dataMessage = useRecoilValue(isMenssage);
  const [messagesAll, setMessagesAll] = useState([]);
  const [claveMessage, setclaveMessage] = useState('');
  const containerRef: any = useRef(null);
  const [dataMensajeUser, setDataMensajeUser] = useState<MessageUser>({
    fullName: '',
    img: '',
    id: '',
    rtdb: '',
  });
  const [messageUser, setMessageUser] = useState<MessageUser>({
    message: '',
    read: false,
    rtdb: '',
  });

  const {dataMesssage} = EnviarMessage(messageUser);

  useEffect(() => {
    if (dataMesssage) {
      setMessageUser((prev: any) => ({...prev, message: ''}));
    }
  }, [dataMesssage]);
  useEffect(() => {
    const chatrooms = ref(
      rtdb,
      '/rooms/' + dataMensajeUser?.rtdb + '/messages'
    );

    return onValue(chatrooms, (snapshot: any) => {
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
  }, [dataMensajeUser?.rtdb]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    if (messagesAll) {
      const utlimoMensaje: any = messagesAll[messagesAll.length - 1];

      if (
        utlimoMensaje?.read == false &&
        utlimoMensaje.id !== dataUser.user.id
      ) {
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
  }, [messagesAll]);
  useEffect(() => {
    const rtdbParams = params.get('rtdb') as any;
    const imgParams = params.get('img') as string;
    const fullNameParams = params.get('fullName') as string;
    const idParams = params.get('id') as string;

    if (rtdbParams && idParams && fullNameParams) {
      const miArrayRTDB = rtdbParams.split(',');

      const rtdbId = existenElementosSimilares(
        miArrayRTDB,
        dataUser.user?.rtdb as []
      );

      setDataMensajeUser({
        fullName: fullNameParams,
        img: imgParams,
        id: idParams,
        rtdb: rtdbId,
      });
      setMessageUser((prev: any) => ({...prev, rtdb: rtdbId}));
    }
  }, [params.get('fullName')]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessageUser((prev: any) => ({...prev, message: e.target.message.value}));
    setTimeout(() => {
      e.target.message.value = '';
    }, 200);
  };
  const handleClose = (e: any) => {
    e.preventDefault();
    setDataMensajeUser({
      fullName: '',
      img: '',
      id: '',
      rtdb: undefined,
    });
    router.replace('/chat');
  };
  return (
    <DivTemMensaje>
      {!dataMensajeUser.rtdb ? (
        <TemplMensaje>
          <h2 className='text-2xl font-bold text-center'>Chats</h2>
          <TemplChat>
            {dataGetAllUsersChat ? (
              dataGetAllUsersChat.length ? (
                dataGetAllUsersChat.map((e) => {
                  return (
                    <button
                      type='submit'
                      className='w-full  rounded-md hover:opacity-70 '
                      key={e.id}
                      onClick={() => {
                        const rtdbId = existenElementosSimilares(
                          e.rtdb,
                          dataUser.user.rtdb as []
                        );
                        setMessageUser({
                          rtdb: rtdbId as string,
                          message: '',
                          read: false,
                        });
                        setDataMensajeUser({
                          fullName: e.fullName,
                          img: e.img,
                          id: e.id.toString(),
                          rtdb: rtdbId as string,
                        });
                      }}>
                      <DivAllChat>
                        <FotoPerfil
                          img={e.img}
                          className='w-[40px] h-[40px]'
                          connect={
                            dataIsConnect?.find(
                              (eConnect: any) => e.id == eConnect.id
                            )?.connect && true
                          }
                        />

                        <h4 className='m-0 text-start'>{e.fullName}</h4>
                        {dataMessage?.find((item: any) => item.id == e.id) && (
                          <SpanNoti>
                            {
                              dataMessage?.filter(
                                (user: any) => user.id == e.id
                              ).length
                            }
                          </SpanNoti>
                        )}
                      </DivAllChat>
                    </button>
                  );
                })
              ) : (
                'Sin Chat'
              )
            ) : (
              <SkeletonMenssage />
            )}
          </TemplChat>
        </TemplMensaje>
      ) : null}

      {dataMensajeUser.rtdb ? (
        <TemplSns>
          <div className='flex justify-between border-[1px] border-[#3b3b3b] p-2'>
            <div className='flex items-center gap-4'>
              <Link
                href={
                  '/amigos/' +
                  dataMensajeUser.id +
                  '/' +
                  dataMensajeUser.fullName
                }>
                <FotoPerfil
                  className='w-[40px] h-[40px]'
                  img={dataMensajeUser.img || ''}
                  connect={
                    dataIsConnect?.find(
                      (eConnect: any) => dataMensajeUser.id == eConnect.id
                    )?.connect && true
                  }
                />
              </Link>
              <h5 style={{margin: '0'}}>{dataMensajeUser.fullName}</h5>
            </div>
            <Button onClick={handleClose}>
              <CloseSVG />
            </Button>
          </div>
          <div className='flex flex-col gap-4 h-full  border-[1px] border-[#3b3b3b]'>
            <Sms ref={containerRef}>
              {messagesAll
                ? messagesAll?.map((e: any, p: any) => {
                    return (
                      <div
                        key={p}
                        id={e.id}
                        style={{
                          display: 'block',
                          textAlign: e.id == dataUser.user.id ? 'end' : 'start',
                        }}>
                        <Menssage
                          isUser={e.id == dataUser.user.id ? true : false}>
                          {e.message}
                        </Menssage>
                      </div>
                    );
                  })
                : null}
              {messagesAll?.length > 0 &&
                (messagesAll[messagesAll.length - 1] as any).id ===
                  dataUser.user.id &&
                (messagesAll[messagesAll.length - 1] as any).read && (
                  <p style={{margin: '0', textAlign: 'end', color: '#ddd'}}>
                    ✔ Visto
                  </p>
                )}
            </Sms>
            <div>
              <form
                action=''
                onSubmit={handleSubmit}
                className='flex items-center gap-4 p-4 text-secundary'>
                <Input
                  id='message'
                  type='text'
                  placeholder='Escribe un mensaje'
                />

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
      ) : null}
    </DivTemMensaje>
  );
}

function existenElementosSimilares(array1: string[], array2: string[]) {
  return array1.find((elemento1) => {
    return array2.find((elemento2) => {
      return elemento1 === elemento2;
    });
  });
}
