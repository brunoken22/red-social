'use client';
import {rtdb} from '@/lib/firebase';
import {ref, onValue} from 'firebase/database';
import './style.css';
import 'instantsearch.css/themes/satellite.css';
import {usePathname} from 'next/navigation';
import {SearchBox, Hits, useHits, Pagination} from 'react-instantsearch';
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
} from '@/lib/atom';
const stylelinkIcon: {fill: string; position: any} = {
  fill: '#b3b3b3',
  position: 'relative',
};

export function Header() {
  const pathname = usePathname();
  const dataUser = useRecoilValue(user);
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const datapublicacionUser = useRecoilValue(publicacionUser);
  const [search, setSearch] = useState('');
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

    dataUser?.user?.rtdb.map((item: string) => {
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

  return dataUser?.user?.id ? (
    <HeaderNav>
      <Nav>
        <InputDiv>
          <Link href={'/home'}>
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
                  {/* <Pagination /> */}
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
          <Link href={'/search'}>
            <EnlaceSearch>
              <Search />
            </EnlaceSearch>
          </Link>
          <Link href={'/home'} style={stylelinkIcon}>
            <Enlaces>
              <Home />
            </Enlaces>
          </Link>
          <Link href={'/amigos'} style={stylelinkIcon}>
            {dataSoliReci?.length > 0 && (
              <DivNotificacionActi>{dataSoliReci?.length}</DivNotificacionActi>
            )}
            <Enlaces>
              <Amigos />
            </Enlaces>
          </Link>
          <Link href={'/mensaje'} style={stylelinkIcon}>
            {dataMessage.length > 0 && (
              <DivNotificacionActi>{dataMessage.length}</DivNotificacionActi>
            )}
            <Enlaces>
              <Chat />{' '}
            </Enlaces>
          </Link>
          <Link href={'/notificaciones'} style={stylelinkIcon}>
            {datapublicacionUser?.length > 0 &&
              datapublicacionUser?.filter((e: any) => e.open == true).length !==
                0 && (
                <DivNotificacionActi>
                  {
                    datapublicacionUser?.filter((e: any) => e.open == true)
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
            />
          </Button>
          {menu ? <Menu click={handleClick} /> : null}
        </div>
      </Nav>
    </HeaderNav>
  ) : null;
}
