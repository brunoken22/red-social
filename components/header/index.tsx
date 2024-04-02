'use client';
import {
  ref,
  onValue,
  update,
  onDisconnect,
  goOffline,
  goOnline,
  off,
  get,
  child,
  getDatabase,
} from 'firebase/database';
import {rtdb} from '@/lib/firebase';
import './style.css';
import {usePathname, useRouter} from 'next/navigation';
import {SearchBox, Hits, useHits} from 'react-instantsearch';
import {Hit} from '../searchUsers';
import React, {useEffect, useState} from 'react';
import Logo from '@/public/logo.svg';
import {
  HeaderNav,
  Nav,
  DivEnlaces,
  InputDiv,
  DivInputSearch,
  Enlaces,
  EnlaceSearch,
  Button,
  DivNotificacionActi,
  DivConectados,
  DivConnect,
  DivConnectAll,
  DivContenedorConnect,
} from './styled';
import {useGlobalAudioPlayer} from 'react-use-audio-player';
import Home from '@/ui/icons/home.svg';
import Amigos from '@/ui/icons/amigos.svg';
import Chat from '@/ui/icons/chat.svg';
import Notificaciones from '@/ui/icons/notificaciones.svg';
import Search from '@/ui/icons/search.svg';
import Link from 'next/link';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Menu} from '@/components/menu';
import {useRecoilValue, useRecoilState} from 'recoil';
import {
  user,
  getAllSolicitudesRecibidas,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  User,
  getAllUser,
  getAllUsersChat,
} from '@/lib/atom';
import {ButtonSmsConnect} from '@/ui/boton';
import {DivAllConnect} from '@/ui/container';

const stylelinkIcon: {fill: string; position: any} = {
  fill: '#b3b3b3',
  position: 'relative',
};

export function Header() {
  const {load} = useGlobalAudioPlayer();
  const pathname = usePathname();
  const router = useRouter();
  const dataUser = useRecoilValue(user);
  const getAllUserData = useRecoilValue(getAllUser);
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const [, setDatagetAllUsersChat] = useRecoilState(getAllUsersChat);
  const [dataIsConnect, setIsConnect] = useRecoilState(isConnect);
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  const [notificationSound, setNotificationSound] = useState<any[]>([]);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const [search, setSearch] = useState('');
  const [allConnectAmigos, setAllConnectAmigos] = useState([]);
  const [connectAmigos, setConnectAmigos] = useState(false);
  const [menu, setMenu] = useState(false);
  const {hits} = useHits();
  const handleMenu = (e: any) => {
    e.preventDefault();
    if (menu) {
      setMenu(false);
      return;
    }
    setMenu(true);
  };
  const handleClick = (data: boolean) => {
    setMenu(data);
  };
  useEffect(() => {
    if (notificacionesUserAtom.length) {
      const newNotificationSound = notificacionesUserAtom.filter((item) => {
        load('/notification.mp3', {autoplay: true});
        return {
          ...item,
          notification: false,
        };
      });
      setNotificationSound(newNotificationSound);
    }
  }, [notificacionesUserAtom]);
  // useEffect(() => {
  //   if (notificationSound.length) {
  //     const newNoti = notificationSound.map((item) => {
  //       load('/notification.mp3', {autoplay: true});
  //       return {
  //         ...item,
  //         notification: true,
  //       };
  //     });
  //     setNotificationSound(newNoti);
  //   }
  // }, [notificationSound]);
  useEffect(() => {
    if (!dataUser?.user?.id) return;
    let count: any = [];
    goOnline(rtdb);
    dataUser.user.rtdb?.map((item: string) => {
      const chatrooms = ref(rtdb, '/rooms/' + item + '/messages');
      return onValue(chatrooms, (snapshot: any) => {
        const valor = snapshot.val();
        if (valor) {
          const datas: any = Object?.values(valor);
          const utlimoMensaje: any = datas[datas.length - 1];
          datas.reverse().findIndex((object: any, indice: number) => {
            if (object.id != dataUser.user.id && object.read) {
              return object;
            }
            const reversedDatas = datas.reverse();
            const lastIndex = reversedDatas.length - indice;

            if (
              reversedDatas[lastIndex] &&
              reversedDatas[lastIndex].read === false
            ) {
              return object;
            }
          });

          if (utlimoMensaje.id != dataUser.user.id) {
            if (!utlimoMensaje.read) {
              count.push(utlimoMensaje);
              setDataMessage([...count]);
              // play();
              load('/messages.mp3', {autoplay: true});
              return;
            }
            if (utlimoMensaje.read) {
              const filtoMensa = count?.filter(
                (item: any) => item.id !== utlimoMensaje.id
              );

              if (filtoMensa) {
                count = filtoMensa;

                setDataMessage([...filtoMensa]);
              }
            }
          }
        }
      });
    });
    return () => {
      if (!dataUser?.user?.id) return;
      goOffline(rtdb);
      // userReset();
    };
  }, [dataUser?.user?.rtdb]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;

    const dbRef = ref(getDatabase());
    get(child(dbRef, 'rooms')).then((snapshot) => {
      if (snapshot.exists()) {
        const value = Object.values(snapshot.val());

        const userDataMenssage = value.filter(
          (dataUserChat: any) =>
            dataUserChat.userId == dataUser.user.id ||
            dataUserChat.amigoId == dataUser.user.id
        );
        if (userDataMenssage) {
          const userChatUser = userDataMenssage.map((snap: any) => {
            if (snap.userId == dataUser.user.id) {
              return snap.amigoId;
            }
            if (snap.amigoId == dataUser.user.id) return snap.userId;
          });
          const newUserConnectChat = getAllUserData.filter((item: User) =>
            userChatUser.includes(item.id)
          );
          setDatagetAllUsersChat(newUserConnectChat);
        }
      } else {
      }
    });
  }, [dataUser?.user?.id, getAllUserData, dataMessage]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    goOnline(rtdb);
    const connectRef = ref(rtdb, '/connect');
    const connectRefData = ref(rtdb, '/connect/' + dataUser?.user?.id);
    onValue(connectRef, (snapshot: any) => {
      const valor = snapshot.val();

      if (valor) {
        const dataConnect: any = Object.values(valor);
        setIsConnect(dataConnect);
        if (!dataUser?.user?.amigos?.length) return;
        const connecam = dataConnect.filter((e: Connect) => {
          return (
            e.id != Number(dataUser.user.id) &&
            e.connect &&
            dataUser.user.amigos.includes(e.id)
          );
        });
        setAllConnectAmigos(connecam);
        update(connectRefData, {
          ...dataUser?.user,
          connect: true,
        });
      }
    });
    window.addEventListener('beforeunload', () => {
      onDisconnect(connectRefData).update({connect: false});
    });
    return () => {
      if (!dataUser?.user?.id) return;
      onDisconnect(connectRefData).update({connect: false});
      goOffline(rtdb);
      off(connectRef);
      off(connectRefData);
      // userReset();
    };
  }, [dataUser?.user?.id]);

  return dataUser?.user?.id ? (
    <>
      <HeaderNav>
        <Nav>
          <InputDiv>
            <Link href={'/home'} aria-label='home'>
              <Logo style={{borderRadius: '10px', fill: '#fff'}} />
            </Link>
            <DivInputSearch>
              {pathname !== '/search' && (
                <SearchBox
                  placeholder='UniRed'
                  onChangeCapture={(e: any) => {
                    e.target.form
                      .querySelector('.ais-SearchBox-reset')
                      .addEventListener('click', () => setSearch(''));
                    setSearch(e.target.value);
                  }}
                />
              )}

              {search && pathname !== '/search' ? (
                hits.length ? (
                  <>
                    <Hits hitComponent={Hit} />
                  </>
                ) : (
                  <p
                    style={{
                      position: 'absolute',
                      backgroundColor: '#ff1100',
                      padding: '1rem',
                    }}>
                    {' '}
                    No se encontraron resultado
                  </p>
                )
              ) : null}
            </DivInputSearch>
          </InputDiv>
          <DivEnlaces>
            <Link href={'/search'} aria-label='search'>
              <EnlaceSearch $isPathname={pathname == '/search' ? true : false}>
                <Search />
              </EnlaceSearch>
            </Link>
            <Link href={'/home'} style={stylelinkIcon} aria-label='home'>
              <Enlaces $isPathname={pathname == '/home' ? true : false}>
                <Home />
              </Enlaces>
            </Link>
            <Link href={'/amigos'} style={stylelinkIcon} aria-label='amigos'>
              {dataSoliReci?.length > 0 && (
                <DivNotificacionActi>
                  {dataSoliReci?.length}
                </DivNotificacionActi>
              )}
              <Enlaces $isPathname={pathname == '/amigos' ? true : false}>
                <Amigos />
              </Enlaces>
            </Link>
            <Link href={'/mensaje'} style={stylelinkIcon} aria-label='mensaje'>
              {dataMessage.length > 0 && (
                <DivNotificacionActi>
                  {obtenerObjetosUnicos(dataMessage).length}
                </DivNotificacionActi>
              )}
              <Enlaces $isPathname={pathname == '/mensaje' ? true : false}>
                <Chat />{' '}
              </Enlaces>
            </Link>
            <Link
              href={'/notificaciones'}
              style={stylelinkIcon}
              aria-label='notificaciones'>
              {notificacionesUserAtom?.length > 0 &&
                notificacionesUserAtom?.filter((e: any) => e.open == true)
                  .length !== 0 && (
                  <DivNotificacionActi>
                    {
                      notificacionesUserAtom?.filter((e: any) => e.open == true)
                        .length
                    }
                  </DivNotificacionActi>
                )}
              <Enlaces
                $isPathname={pathname == '/notificaciones' ? true : false}>
                <Notificaciones />{' '}
              </Enlaces>
            </Link>
          </DivEnlaces>
          <div style={{position: 'relative'}}>
            <Button onClick={handleMenu}>
              <FotoPerfil
                wid='40'
                hei='40'
                img={dataUser.user.img}
                fullName={dataUser.user.fullName}
                connect={
                  dataIsConnect?.find((e: any) => e.id == dataUser.user?.id) &&
                  true
                }
              />
            </Button>
            {menu ? <Menu click={handleClick} /> : null}
          </div>
        </Nav>
      </HeaderNav>
      <DivContenedorConnect>
        <DivConectados onClick={() => setConnectAmigos(!connectAmigos)}>
          <span>Conectados</span> <DivConnect />
        </DivConectados>

        <DivConnectAll>
          {connectAmigos ? (
            allConnectAmigos?.length > 0 ? (
              allConnectAmigos.map((e: User, p: any) => {
                return (
                  <ButtonSmsConnect
                    key={p}
                    onClick={() =>
                      router.push(
                        '/mensaje?fullName=' +
                          e.fullName +
                          '&rtdb=' +
                          e.rtdb +
                          '&id=' +
                          e.id +
                          '&img=' +
                          e.img
                      )
                    }>
                    <DivAllConnect>
                      <FotoPerfil
                        img={e.img}
                        wid='30'
                        hei='30'
                        connect={
                          dataIsConnect?.find(
                            (eConnect: any) => e.id == eConnect.id
                          )?.connect && true
                        }
                      />

                      <span
                        style={{
                          color: '#000',
                          margin: 0,
                          textAlign: 'start',
                          fontSize: '1rem',
                        }}>
                        {e.fullName}
                      </span>
                    </DivAllConnect>
                  </ButtonSmsConnect>
                );
              })
            ) : (
              <div>No hay conectados</div>
            )
          ) : null}
        </DivConnectAll>
      </DivContenedorConnect>
    </>
  ) : null;
}
const obtenerObjetosUnicos = (array: any[]) => {
  return array.reduce((resultado, objeto) => {
    const existe = resultado.some((item: any) => item['id'] === objeto['id']);
    if (!existe) {
      resultado.push(objeto);
    }
    return resultado;
  }, []);
};
