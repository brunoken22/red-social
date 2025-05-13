'use client';
import React from 'react';
import RecoilRootLayout from './recoilRoot';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { history } from 'instantsearch.js/es/lib/routers';
import { SessionProvider } from 'next-auth/react';

const searchClient = algoliasearch('8W3ZG1OHSP', process.env.NEXT_PUBLIC_ALGOLIA as string);
export default function Layout({
  children,
  themeDate,
}: {
  children: React.ReactNode;
  themeDate: string;
}) {
  return (
    <SessionProvider>
      <InstantSearch
        indexName='users'
        searchClient={searchClient}
        future={{ preserveSharedStateOnUnmount: true }}
        routing={{
          router: history({
            cleanUrlOnDispose: false,
          }),
        }}>
        <RecoilRootLayout dateTheme={themeDate}>{children}</RecoilRootLayout>
      </InstantSearch>
    </SessionProvider>
  );
}
