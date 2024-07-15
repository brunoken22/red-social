import './globals.css';
import dynamic from 'next/dynamic';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
const poppins = Poppins({weight: '400', subsets: ['latin']});

const Layout = dynamic(() => import('@/components/layout'), {ssr: false});

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
        <meta
          name='google-site-verification'
          content='CnmK8AWJQTO2MYQ5J7dOu9_dhCFy-ttErrYHDEWbOyw'
        />
        <link rel='preconnect' href='https://8w3zg1ohsp-2.algolianet.com' />
      </head>
      <body
        className={`${poppins.className} dark:bg-dark dark:text-white dark:transition-dark`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
