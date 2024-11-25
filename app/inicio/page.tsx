import dynamic from 'next/dynamic';
import { DivPublicaciones } from '@/ui/container';
import { Span } from '@/components/span';
import { Metadata } from 'next';
const Publicar = dynamic(() => import('@/components/publicar'));
const PublicacionesAll = dynamic(() => import('@/components/publicaciones/publicationsAll'));

export const metadata: Metadata = {
  title: 'Inicio | UniRed',
  description: 'Inicio de unired',
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
