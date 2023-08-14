'use client';
import {StyledComponentsRegistry} from './registry';
import {Header} from '@/components/header';
import {ThemeProvider} from 'styled-components';

export function Layout({children}: {children: React.ReactNode}) {
  const theme = {
    default: {
      bg: '#242526;',
      color: '#fff',
      contenedor: '#1c1c1c',
    },
  };
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme.default}>
        <Header />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
