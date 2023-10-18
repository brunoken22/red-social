'use client';

import React, {useEffect, useState} from 'react';
import {usePathname, useRouter, useServerInsertedHTML} from 'next/navigation';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';
import {GetUser, GetAllAmigos} from '@/lib/hook';
export function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {data, isLoading} = GetUser(token);
  GetAllAmigos(token);
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());
  useEffect(() => {
    if (!isLoading) {
      if (!data) {
        router.push('/');
      }
      if (data && pathname === '/') {
        router.push('/home');
      }
    }
  }, [isLoading]);

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
