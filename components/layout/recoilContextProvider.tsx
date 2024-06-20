import {GetUser, NotificacionesUser} from '@/lib/hook';
import React from 'react';
export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  GetUser();
  NotificacionesUser(0);
  return <> {children}</>;
}
