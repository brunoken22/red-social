'use client';
import {StyledComponentsRegistry} from './registry';
import {Header} from '@/components/header';
import {ThemeProvider} from 'styled-components';
import React from 'react';
import {RecoilRoot} from 'recoil';

export function Layout({children}: {children: React.ReactNode}) {
  const theme = {
    default: {
      bg: '#242526;',
      color: '#fff',
      contenedor: '#1c1c1c',
    },
  };

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
            {/* <Header /> */}
            {children}
          </div>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </RecoilRoot>
  );
}
