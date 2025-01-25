import { Span } from '@/components/span';
import { ContainerMain, DivMain } from '@/ui/container';
import AmigosComponent from '@/components/friendRequest';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Amigos | UniRed',
  description: 'Encuentra y conecta con nuevos amig@s en UniRed.',
  openGraph: {
    title: 'Amigos | UniRed',
    description: 'Encuentra y conecta con nuevos amig@s en UniRed.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/amigos',
    type: 'website',
  },
  twitter: {
    title: 'Amigos | UniRed',
    description: 'Encuentra y conecta con nuevos amig@s en UniRed.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};

export default function Amigos() {
  return (
    <DivMain>
      <ContainerMain>
        <AmigosComponent />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
