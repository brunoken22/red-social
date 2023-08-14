'use client';
import React, {useState, useEffect, useRef} from 'react';
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
} from './styled';
import Home from '@/ui/icons/home.svg';
import Amigos from '@/ui/icons/amigos.svg';
import Chat from '@/ui/icons/chat.svg';
import Notificaciones from '@/ui/icons/notificaciones.svg';
import Search from '@/ui/icons/search.svg';
import Link from 'next/link';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Menu} from '@/components/menu';
const stylelinkIcon = {
  fill: '#b3b3b3',
};

export function Header() {
  const [menu, setMenu] = useState(false);
  const refMenu: any = useRef();

  const handleMenu = (e: any) => {
    e.preventDefault();
    console.log('sd');
    if (menu) {
      setMenu(false);
      return;
    }
    setMenu(true);
  };
  const handleClick = (data: boolean) => {
    setMenu(data);
  };
  return (
    <HeaderNav>
      <Nav>
        <InputDiv>
          <Logo style={{borderRadius: '10px', fill: '#fff'}} />
          <Input type='text' placeholder='Buscador'></Input>
        </InputDiv>
        <DivEnlaces>
          <Link href={'/search'}>
            <EnlaceSearch>
              <Search />
            </EnlaceSearch>
          </Link>
          <Link href={'/'} style={stylelinkIcon}>
            <Enlaces>
              <Home />
            </Enlaces>
          </Link>
          <Link href={'/amigos'} style={stylelinkIcon}>
            <Enlaces>
              <Amigos />{' '}
            </Enlaces>
          </Link>
          <Link href={'/mensaje'} style={stylelinkIcon}>
            <Enlaces>
              <Chat />{' '}
            </Enlaces>
          </Link>
          <Link href={'/notificaciones'} style={stylelinkIcon}>
            <Enlaces>
              <Notificaciones />{' '}
            </Enlaces>
          </Link>
        </DivEnlaces>
        <div style={{position: 'relative'}}>
          <Button onClick={handleMenu}>
            <FotoPerfil />
          </Button>
          {menu ? <Menu click={handleClick} /> : null}
        </div>
      </Nav>
    </HeaderNav>
  );
}
