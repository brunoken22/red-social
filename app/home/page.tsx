import {Main, DivPublicaciones, ContainerMain} from '@/ui/container';
import {Publicar} from '@/components/publicar';
import {PublicacionesAll} from '@/components/publicaciones';
import {Span} from '@/components/span';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Home | UniRed',
};
export default function Home() {

  return (
    <Main>
      <ContainerMain>
        <DivPublicaciones>
          <Publicar />
          <PublicacionesAll />
        </DivPublicaciones>
        <Span />
      </ContainerMain>
    </Main>
  );
}
