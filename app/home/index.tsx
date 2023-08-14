'use client';

import {Main, DivPublicaciones, ContainerMain} from '@/ui/container';
import {Publicar} from '@/components/publicar';
import {Publicaciones} from '@/components/publicaciones';
import {Span} from '@/components/span';

export default function Home() {
  return (
    <Main>
      <ContainerMain>
        <DivPublicaciones>
          <Publicar />
          <Publicaciones />
        </DivPublicaciones>
        <Span />
      </ContainerMain>
    </Main>
  );
}
