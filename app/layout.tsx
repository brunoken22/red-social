import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import Layout from '@/components/layout';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });

import { SpeedInsights } from '@vercel/speed-insights/next';
export const metadata: Metadata = {
  title: 'UniRed',
  description: 'Red social',
  keywords: 'La red social líder para conectar con amigos, compartir fotos. Únete hoy mismo y forma parte de nuestra comunidad.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get('theme')?.value || 'false';

  return (
    <html lang='es'>
      <head>
        <meta name='google-site-verification' content='CnmK8AWJQTO2MYQ5J7dOu9_dhCFy-ttErrYHDEWbOyw' />
        <link rel='preconnect' href='https://red-social-node.onrender.com' />
        <link rel='preconnect' href='https://res.cloudinary.com' />
        <meta name='color-scheme' content='only light' />
      </head>
      <body className={`${poppins.className} dark:bg-dark dark:text-white dark:transition-dark`}>
        <Layout themeDate={theme}>{children}</Layout>
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
