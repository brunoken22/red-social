import {GetUser, NotificacionesUser} from '@/lib/hook';
import React, {useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {RecoilRoot} from 'recoil';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch';
export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const token =
  //   typeof window !== 'undefined'
  //     ? (localStorage.getItem('token') as string)
  //     : '';
  GetUser();
  // NotificacionesUser(token, 0);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (!data) {
  //       router.push('/');
  //     }
  //     if (data && pathname === '/') {
  //       router.push('/home');
  //     }
  //   }
  // }, [isLoading]);

  return <> {children}</>;
}
