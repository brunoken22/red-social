'use client';
import React, { useEffect } from 'react';
import RecoilRootLayout from './recoilRoot';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { history } from 'instantsearch.js/es/lib/routers';

const searchClient = algoliasearch('8W3ZG1OHSP', process.env.NEXT_PUBLIC_ALGOLIA as string);
export default function Layout({
  children,
  themeDate,
}: {
  children: React.ReactNode;
  themeDate: string;
}) {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    });
    const sub = await registration.pushManager.getSubscription();
  }

  return (
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
  );
}
