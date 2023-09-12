'use client';
import {DivAllChat} from '@/ui/container';
import {
  DivTemMensaje,
  TemplMensaje,
  TemplChat,
  TemplSns,
  Sms,
  Menssage,
} from './styled';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {BotonSms, ButtonSms} from '@/ui/boton';
import {useRecoilValue} from 'recoil';
import {getAllAmigos, user} from '@/lib/atom';
import {useEffect, useRef, useState} from 'react';
import {rtdb} from '@/lib/firebase';
import {ref, onValue} from 'firebase/database';
import {EnviarMessage} from '@/lib/hook';

export function TemMensaje() {
  const dataAllAmigos = useRecoilValue(getAllAmigos);
  const dataUser = useRecoilValue(user);
  const [messagesAll, setMessagesAll] = useState([]);
  const containerRef: any = useRef(null);
  const [dataMensajeUser, setDataMensajeUser] = useState({
    fullName: '',
    img: '',
    id: '',
    rtdb: '' || undefined,
  });
  const [messageUser, setMessageUser] = useState({
    message: '',
    rtdb: '' || undefined,
  });
  const {dataMesssage} = EnviarMessage(messageUser);

  const chatrooms = ref(rtdb, '/rooms/' + dataMensajeUser?.rtdb + '/messages');
  useEffect(() => {
    if (dataMesssage) {
      setMessageUser((prev: any) => ({...prev, message: ''}));
    }
  }, [dataMesssage]);
  useEffect(() => {
    onValue(chatrooms, (snapshot: any) => {
      const valor = snapshot.val();
      if (valor) {
        const datas: any = Object.values(valor);
        setMessagesAll(datas); // Actualiza el estado aquí
      }
    });
  }, [dataMensajeUser]);
  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current.scrollTop);
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messagesAll]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessageUser((prev: any) => ({...prev, message: e.target.message.value}));
    setTimeout(() => {
      e.target.message.value = '';
    }, 200);
  };

  return (
    <DivTemMensaje>
      <TemplMensaje>
        <h2>Chats</h2>
        <TemplChat>
          {dataAllAmigos
            ? dataAllAmigos.map((e: any, p: any) => {
                return (
                  <ButtonSms
                    key={p}
                    onClick={() => {
                      const rtdbId = existenElementosSimilares(
                        e.rtdb,
                        dataUser.user.rtdb as []
                      );
                      setMessageUser({
                        rtdb: rtdbId,
                        message: '',
                      });
                      setDataMensajeUser({
                        fullName: e.fullName,
                        img: e.img,
                        id: e.id,
                        rtdb: rtdbId,
                      });
                    }}>
                    <DivAllChat>
                      <FotoPerfil img={e.img} />
                      <h4 style={{color: '#fff', margin: 0}}>{e.fullName}</h4>
                    </DivAllChat>
                  </ButtonSms>
                );
              })
            : 'Sin Conversaciones'}
        </TemplChat>
      </TemplMensaje>
      {dataMensajeUser.id ? (
        <TemplSns>
          <div
            style={{
              display: 'inherit',
              alignItems: 'center',
              gap: '1rem',
              borderBottom: '1px solid #3b3b3b',
            }}>
            <FotoPerfil img={dataMensajeUser.img} />
            <h5 style={{margin: '0'}}>{dataMensajeUser.fullName}</h5>
          </div>
          <div
            style={{
              minHeight: '650px',
              display: 'inherit',
              flexDirection: 'column',
              gap: '1rem',
            }}>
            <Sms ref={containerRef}>
              {messagesAll
                ? messagesAll?.map((e: any, p: any) => (
                    <div
                      key={p}
                      style={{
                        display: 'block',
                        textAlign: e.id == dataUser.user.id ? 'end' : 'start',
                      }}>
                      <Menssage
                        $isUser={e.id == dataUser.user.id ? true : false}>
                        {e.message}
                      </Menssage>
                    </div>
                  ))
                : null}
            </Sms>
            <div>
              <form
                action=''
                onSubmit={handleSubmit}
                style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <Input
                  id='message'
                  type='text'
                  placeholder='Escribe un mensaje'
                />
                <BotonSms type='submit' id={dataMensajeUser.rtdb}>
                  Enviar
                </BotonSms>
              </form>
            </div>
          </div>
        </TemplSns>
      ) : null}
    </DivTemMensaje>
  );
}
function existenElementosSimilares(array1: [], array2: []) {
  return array1.find((elemento1) => {
    return array2.find((elemento2) => {
      return elemento1 === elemento2;
    });
  });
}
