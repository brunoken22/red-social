import './globals.css';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import Layout from '@/components/layout';
const poppins = Poppins({weight: '400', subsets: ['latin']});

export const metadata: Metadata = {
  title: 'UniRed',
  description: 'Red social',
  keywords:
    'La red social líder para conectar con amigos, compartir fotos. Únete hoy mismo y forma parte de nuestra comunidad.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <head>
        <link rel='preload' href='/logo.webp' as='image' />
        <link rel='preload' href='/portafolio.webp' as='image' />
        <link rel='preload' href='/user.webp' as='image' />
        <link rel='preconnect' href='https://8w3zg1ohsp-2.algolianet.com' />
      </head>
      <body
        className={`${poppins.className} dark:bg-dark dark:text-white dark:transition-dark`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
