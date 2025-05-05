'use client';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SkeletonNav } from '@/ui/skeleton';
const Header = dynamic(() => import('@/components/header'), { loading: () => <SkeletonNav /> });

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

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
      <div className={`${comparationPathname ? 'mt-8  ml-2 mr-2 max-md:mt-4' : ''} `}>
        {children}
      </div>
    </RecoilRoot>
  );
}
