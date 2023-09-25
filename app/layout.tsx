import './globals.css';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import {Layout} from '@/components/layout';
const poppins = Poppins({weight: '400', subsets: ['latin']});

export const metadata: Metadata = {
  title: 'UniRed',
  description: 'Red social',
  keywords:
    'La red social líder para conectar con amigos, compartir fotos. Únete hoy mismo y forma parte de nuestra comunidad.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
