'use client';

import {Main, DivPublicaciones, ContainerMain} from '@/ui/container';
import {Publicar} from '@/components/publicar';
import {Publicaciones} from '@/components/publicaciones';
import {Span} from '@/components/span';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Cuenta|UniRed</title>
        <meta property='og:title' content='My page title' key='title' />
      </Head>
      <Main>
        <ContainerMain>
          <DivPublicaciones>
            <Publicar />
            <Publicaciones />
          </DivPublicaciones>
          <Span />
        </ContainerMain>
      </Main>
    </>
  );
}
