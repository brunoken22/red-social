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
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {BotonSms, ButtonSms} from '@/ui/boton';
import {useRecoilValue} from 'recoil';
import {getAllAmigos, user, isMenssage} from '@/lib/atom';
import {useEffect, useRef, useState} from 'react';
import {rtdb} from '@/lib/firebase';
import {ref, onValue, update, get} from 'firebase/database';
import {EnviarMessage} from '@/lib/hook';
import CloseSVG from '@/ui/icons/close.svg';
import {Button} from '../publicar/styled';
export function TemMensaje() {
  const dataAllAmigos = useRecoilValue(getAllAmigos);
  const dataUser = useRecoilValue(user);
  const dataMessage = useRecoilValue(isMenssage);
  const [messagesAll, setMessagesAll] = useState([]);
  const [claveMessage, setclaveMessage] = useState('');
  const containerRef: any = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dataMensajeUser, setDataMensajeUser] = useState({
    fullName: '',
    img: '',
    id: '',
    rtdb: '' || undefined,
  });
  const [messageUser, setMessageUser] = useState({
    message: '',
    read: false,
    rtdb: '' || undefined,
  });
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {dataMesssage} = EnviarMessage(messageUser, token);

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
      }
    });
  }, [dataMensajeUser.rtdb]);
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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Agregar un event listener para el evento de cambio de tamaño de ventana
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
  };

  return (
    <DivTemMensaje>
      {!dataMensajeUser.rtdb ? (
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
                          read: false,
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
                      {dataMessage?.find((item: any) => item.id == e.id) && (
                        <SpanNoti></SpanNoti>
                      )}
                    </ButtonSms>
                  );
                })
              : 'Sin Conversaciones'}
          </TemplChat>
        </TemplMensaje>
      ) : null}

      {dataMensajeUser.rtdb ? (
        <TemplSns>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: '1px solid #3b3b3b',
            }}>
            <div
              style={{
                display: 'inherit',
                alignItems: 'center',
                gap: '1rem',
              }}>
              <FotoPerfil img={dataMensajeUser.img} />
              <h5 style={{margin: '0'}}>{dataMensajeUser.fullName}</h5>
            </div>
            <Button onClick={handleClose}>
              {' '}
              <CloseSVG />
            </Button>
          </div>
          <div
            style={{
              display: 'inherit',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '70vh',
            }}>
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
                          $isUser={e.id == dataUser.user.id ? true : false}>
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
