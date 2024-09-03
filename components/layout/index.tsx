'use client';
import React, {useEffect} from 'react';
import RecoilRootLayout from './recoilRoot';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch';
import {history} from 'instantsearch.js/es/lib/routers';

const searchClient = algoliasearch(
  '8W3ZG1OHSP',
  process.env.NEXT_PUBLIC_ALGOLIA as string
);
export default function Layout({
  children,
  themeDate,
}: {
  children: React.ReactNode;
  themeDate: string;
}) {
  useEffect(() => {
    const firstConnect = async () => {
      await fetch(`${process.env.NEXT_PUBLIC_PORT}`, {
        method: 'GET',
        credentials: 'include',
      });
    };
    firstConnect();
  }, []);
  return (
    <InstantSearch
      indexName='users'
      searchClient={searchClient}
      future={{preserveSharedStateOnUnmount: true}}
      routing={{
        router: history({
          cleanUrlOnDispose: false,
        }),
      }}>
      <RecoilRootLayout dateTheme={themeDate}>{children}</RecoilRootLayout>
    </InstantSearch>
  );
}
