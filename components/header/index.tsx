'use client';
import {rtdb} from '@/lib/firebase';
import {ref, onValue, update, onDisconnect, off} from 'firebase/database';
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
  publicacionUser,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  User,
} from '@/lib/atom';
import {ButtonSmsConnect} from '@/ui/boton';
import {DivAllConnect} from '@/ui/container';
const stylelinkIcon: {fill: string; position: any} = {
  fill: '#b3b3b3',
  position: 'relative',
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dataUser = useRecoilValue(user);
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const [dataIsConnect, setIsConnect] = useRecoilState(isConnect);
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
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
    let count: any = [];
    dataUser?.user?.rtdb?.map((item: string) => {
      const chatrooms = ref(rtdb, '/rooms/' + item + '/messages');
      onValue(chatrooms, (snapshot: any) => {
        const valor = snapshot.val();
        if (valor) {
          const datas: any = Object?.values(valor);
          const utlimoMensaje: any = datas[datas.length - 1];

          if (utlimoMensaje.id !== dataUser.user.id) {
            if (!utlimoMensaje.read) {
              count.push(utlimoMensaje);
              setDataMessage([...count]);

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
  }, [dataUser?.user?.rtdb]);
  useEffect(() => {
    const connectRef = ref(rtdb, '/connect');
    onValue(connectRef, (snapshot: any) => {
      const valor = snapshot.val();

      if (dataUser?.user?.id) {
        if (valor) {
          const dataConnect: any = Object.values(valor);
          setIsConnect(dataConnect);
          const connecam = dataConnect.filter((e: Connect) => {
            return (
              e.id != Number(dataUser.user.id) &&
              e.connect &&
              dataUser.user.amigos.includes(e.id)
            );
          });
          setAllConnectAmigos(connecam);
          const connectRef = ref(rtdb, '/connect/' + dataUser?.user?.id);

          update(connectRef, {
            ...dataUser?.user,
            connect: true,
          });
          onDisconnect(connectRef).update({connect: false});
        }
      }
    });
  }, [dataUser?.user?.rtdb]);

  useEffect(() => {
    if (dataUser?.user?.id) {
      const connectRef = ref(rtdb, '/connect/' + dataUser?.user?.id);
      update(connectRef, {
        ...dataUser?.user,
        connect: true,
      });
      onDisconnect(connectRef).update({connect: false});
    }
  }, [dataUser]);

  const handleClose = async () => {
    const connectRefAll = ref(rtdb, '/connect');
    const connectRef = ref(rtdb, '/connect/' + dataUser.user.id);
    off(connectRefAll);
    await update(connectRef, {
      connect: false,
    });
  };

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
                hits.length > 0 ? (
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
              <EnlaceSearch>
                <Search />
              </EnlaceSearch>
            </Link>
            <Link href={'/home'} style={stylelinkIcon} aria-label='home'>
              <Enlaces>
                <Home />
              </Enlaces>
            </Link>
            <Link href={'/amigos'} style={stylelinkIcon} aria-label='amigos'>
              {dataSoliReci?.length > 0 && (
                <DivNotificacionActi>
                  {dataSoliReci?.length}
                </DivNotificacionActi>
              )}
              <Enlaces>
                <Amigos />
              </Enlaces>
            </Link>
            <Link href={'/mensaje'} style={stylelinkIcon} aria-label='mensaje'>
              {dataMessage.length > 0 && (
                <DivNotificacionActi>{dataMessage.length}</DivNotificacionActi>
              )}
              <Enlaces>
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
              <Enlaces>
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
            {menu ? <Menu click={handleClick} close={handleClose} /> : null}
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
