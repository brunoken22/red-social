'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SkeletonNav } from '@/ui/skeleton';
const Header = dynamic(() => import('@/components/header'), { loading: () => <SkeletonNav /> });

export default function RecoilRootLayout({
  children,
  dateTheme,
}: {
  children: React.ReactNode;
  dateTheme: string;
}) {
  const pathname = usePathname();
  const comparationPathname =
    pathname !== '/iniciarSesion' && pathname !== '/crearCuenta' && pathname !== '/';
  return (
    <RecoilRoot>
      {comparationPathname ? <Header themeDate={dateTheme} /> : null}
      <div
        className={` ${
          comparationPathname
            ? 'mt-8  max-lg:ml-2 max-lg:mr-2 max-md:mt-4 max-w-screen-lg m-auto'
            : ' w-full'
        } `}>
        {children}
      </div>
    </RecoilRoot>
  );
}
