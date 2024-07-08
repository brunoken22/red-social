import {GetUser, NotificacionesUser} from '@/lib/hook';
import React from 'react';
// import {preload} from 'swr';

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const option = {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // };
  // preload('/user/token', (api) => fetchApiSwr(api, option));

  GetUser();
  NotificacionesUser(0);
  return <> {children}</>;
}
