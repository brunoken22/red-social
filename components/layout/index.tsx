'use client';
import React from 'react';
import {RecoilRoot} from 'recoil';
import {usePathname} from 'next/navigation';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header'));
export default function Layout({
  children,
  dateTheme,
}: {
  children: React.ReactNode;
  dateTheme: string;
}) {
  const pathname = usePathname();
  return (
    <RecoilRoot>
      {' '}
      {pathname !== '/iniciarSesion' && pathname !== '/crearCuenta' ? (
        <Header themeDate={dateTheme} />
      ) : null}
      <div
        className={`${
          pathname !== '/iniciarSesion' && pathname !== '/crearCuenta'
            ? 'mt-8  ml-2 mr-2 max-md:mt-4'
            : ''
        } `}>
        {children}
      </div>
    </RecoilRoot>
  );
}
