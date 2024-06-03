import {Main, DivPublicaciones, ContainerMain} from '@/ui/container';
import {Publicar} from '@/components/publicar';
import {Span} from '@/components/span';
import {Metadata} from 'next';
import {PublicacionesAll} from '@/components/publicaciones/publicationsAll';

export const metadata: Metadata = {
  title: 'Home | UniRed',
  description: 'Inicio',
};
export default function Home() {
  return (
    <main>
      <div className=' flex justify-center w-full gap-6 '>
        <DivPublicaciones>
          <Publicar />
          <PublicacionesAll />
        </DivPublicaciones>
        <Span />
      </div>
    </main>
  );
}
