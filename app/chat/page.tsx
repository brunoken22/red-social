import { TemMensaje } from '@/components/templateMensaje';
import { DivMain } from '@/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat | UniRed',
  description: 'Conversa con tus amig@s en tiempo real a través del chat de UniRed.',
  openGraph: {
    title: 'Chat | UniRed',
    description: 'Conversa con tus amig@s en tiempo real a través del chat de UniRed.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/chat',
    type: 'website',
  },
  twitter: {
    title: 'Chat | UniRed',
    description: 'Conversa con tus amig@s en tiempo real a través del chat de UniRed.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};

export default function Mensaje() {
  return (
    <DivMain>
      <TemMensaje></TemMensaje>
    </DivMain>
  );
}
