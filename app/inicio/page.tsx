import dynamic from 'next/dynamic';
import { DivPublicaciones } from '@/ui/container';
import { Span } from '@/components/span';
import { Metadata } from 'next';
import Publicar from '@/components/publicar';

// const Publicar = dynamic(() => import('@/components/publicar'));
const PublicacionesAll = dynamic(() => import('@/components/publicaciones/publicationsAll'));

export const metadata: Metadata = {
  title: 'Inicio | UniRed',
  description: 'Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.',
  openGraph: {
    title: 'Inicio | UniRed',
    description: 'Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/inicio',
    type: 'website',
  },
  twitter: {
    title: 'Inicio | UniRed',
    description: 'Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
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
