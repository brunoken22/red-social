import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // title: 'UniRed',
  // description: 'Red social',
  // keywords: 'La red social líder para conectar con amigos, compartir fotos. Únete hoy mismo y forma parte de nuestra comunidad.',
  openGraph: {
    title: 'Mi Página Especial',
    description: 'Descripción única de mi página especial.',
    type: 'website',
    images: '/user.webp',
  },
};

export default function UsuarioId({ params }: { params: { name: string } }) {
  return (
    <>
      <title>{decodeURIComponent(params.name) + ' | UniRed '}</title>
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
