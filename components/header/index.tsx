'use client';
import React, {useState} from 'react';
import Logo from '@/public/logo.svg';
import {
  HeaderNav,
  Nav,
  DivEnlaces,
  InputDiv,
  Input,
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
import {useRecoilValue} from 'recoil';
import {user, getAllSolicitudesRecibidas} from '@/lib/atom';
const stylelinkIcon = {
  fill: '#b3b3b3',
  position: 'relative',
};

export function Header() {
  const dataUser = useRecoilValue(user);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const [menu, setMenu] = useState(false);
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
  if (!dataUser?.user?.id) {
    return;
  }
  return dataUser?.user?.id ? (
    <HeaderNav>
      <Nav>
        <InputDiv>
          <Link href={'/home'}>
            <Logo style={{borderRadius: '10px', fill: '#fff'}} />
          </Link>
          <Input type='text' placeholder='Buscador'></Input>
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
            {/* {dataSoliReci?.length > 0 && (
              <DivNotificacionActi>{dataSoliReci?.length}</DivNotificacionActi>
            )} */}
            <Enlaces>
              <Chat />{' '}
            </Enlaces>
          </Link>
          <Link href={'/notificaciones'} style={stylelinkIcon}>
            {/* {dataSoliReci?.length > 0 && (
              <DivNotificacionActi>{dataSoliReci?.length}</DivNotificacionActi>
            )} */}
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
