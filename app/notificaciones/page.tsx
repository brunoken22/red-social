import { DivMain, ContainerMain } from '@/ui/container';
import { TemNoti } from '@/components/templateNotificacion';
import { Span } from '@/components/span';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Notificaciones | UniRed',
  description:
    'Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.',
  openGraph: {
    title: 'Notificaciones | UniRed',
    description:
      'Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/notificaciones',
    type: 'website',
  },
  twitter: {
    title: 'Notificaciones | UniRed',
    description:
      'Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};

export default function Notificaciones() {
  return (
    <DivMain>
      <ContainerMain>
        <TemNoti />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
