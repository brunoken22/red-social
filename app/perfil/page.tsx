import { Metadata } from 'next';
import PerfilUser from '@/components/perfilUser';
import { Main } from '@/ui/container';

export const metadata: Metadata = {
  title: 'Perfil | UniRed',
  description: 'Perfil',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),

  openGraph: {
    title: 'Perfil | UniRed',
    description:
      'Consulta y edita tu perfil en UniRed. Conéctate con tus amig@s y descubre nuevas personas.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/perfil',
    type: 'profile',
  },
  twitter: {
    title: 'Perfil | UniRed',
    description:
      'Consulta y edita tu perfil en UniRed. Conéctate con tus amig@s y descubre nuevas personas.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};

export default function Perfil() {
  return (
    <Main>
      <PerfilUser />
    </Main>
  );
}
