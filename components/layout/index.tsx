'use client';
import Header from '@/components/header';
import React, {useEffect} from 'react';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch';
import RecoidContextProvider from './recoilContextProvider';
import {RecoilRoot} from 'recoil';
import {usePathname} from 'next/navigation';
import {getCookie} from 'cookies-next';
import {Suspense} from 'react';
export default function Layout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const searchClient = algoliasearch(
    '8W3ZG1OHSP',

    process.env.NEXT_PUBLIC_ALGOLIA as string
  );
  const themeValue = getCookie('theme');
  useEffect(() => {
    const theme =
      typeof themeValue === 'string' ? JSON.parse(themeValue) : false;
    if (theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  return (
    <RecoilRoot>
      <Suspense
        fallback={<div className='bg-red-600 fixed inset-0'>loading...</div>}>
        <InstantSearch
          searchClient={searchClient}
          indexName='users'
          future={{preserveSharedStateOnUnmount: true}}>
          <RecoidContextProvider>
            {pathname !== '/signin' && pathname !== '/signup' ? (
              <Header />
            ) : null}
            <div
              className={`${
                pathname !== '/signin' && pathname !== '/signup'
                  ? 'mt-8  ml-2 mr-2 '
                  : ''
              } `}>
              {children}
            </div>
          </RecoidContextProvider>
        </InstantSearch>
      </Suspense>
    </RecoilRoot>
  );
}
