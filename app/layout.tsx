import './globals.css';
import type {Metadata} from 'next';
import {Poppins} from 'next/font/google';
import {Layout} from '@/components/layout';
const poppins = Poppins({weight: '400', subsets: ['latin']});

export const metadata: Metadata = {
  title: 'UniRed',
  description: 'Red social',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        {/* <Layout>{children}</Layout> */}
        {children}
      </body>
    </html>
  );
}
