import dynamic from 'next/dynamic';
import {DivPublicaciones} from '@/ui/container';
import {Span} from '@/components/span';
import {Metadata} from 'next';
const Publicar = dynamic(() => import('@/components/publicar'), {ssr: false});
const PublicacionesAll = dynamic(
  () => import('@/components/publicaciones/publicationsAll'),
  {ssr: false}
);

export const metadata: Metadata = {
  title: 'Inicio | UniRed',
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
