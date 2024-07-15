'use client';
import React from 'react';
import {RecoilRoot} from 'recoil';
import {usePathname} from 'next/navigation';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header'));
export default async function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const theme =
    (await import('cookies-next').then((mod) => mod.getCookie('theme'))) ||
    'false';

  return (
    <RecoilRoot>
      {' '}
      {pathname !== '/iniciarSesion' && pathname !== '/crearCuenta' ? (
        <Header themeDate={theme} />
      ) : null}
      <div
        className={`${
          pathname !== '/iniciarSesion' && pathname !== '/crearCuenta'
            ? 'mt-8  ml-2 mr-2 '
            : ''
        } `}>
        {children}
      </div>
    </RecoilRoot>
  );
}
