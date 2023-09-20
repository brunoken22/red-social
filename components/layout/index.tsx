'use client';
import {StyledComponentsRegistry} from './registry';
import {Header} from '@/components/header';
import {ThemeProvider} from 'styled-components';
import React from 'react';
import {RecoilRoot} from 'recoil';
import algoliasearch from 'algoliasearch/lite';
import {InstantSearch} from 'react-instantsearch';
export function Layout({children}: {children: React.ReactNode}) {
  const theme = {
    default: {
      bg: '#242526;',
      color: '#fff',
      contenedor: '#1c1c1c',
    },
  };
  const searchClient = algoliasearch(
    '8W3ZG1OHSP',
    process.env.NEXT_PUBLIC_ALGOLIA as string
  );
  return (
    <RecoilRoot>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme.default}>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#1c1c1c',
              justifyContent: 'space-between',
            }}>
            <InstantSearch searchClient={searchClient} indexName='users'>
              <Header />
              {children}
            </InstantSearch>
          </div>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </RecoilRoot>
  );
}
