import { Metadata } from 'next';
import SearchMobile from '@/components/searchMobile';
export const metadata: Metadata = {
  title: 'Buscador | UniRed',
  description: 'Buscador de amig@s',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),

  openGraph: {
    title: 'Buscador | UniRed',
    description: 'Encuentra y conecta con tus amig@s o descubre nuevas personas en UniRed.',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/search',
    type: 'website',
  },
  twitter: {
    title: 'Buscador | UniRed',
    description: 'Encuentra y conecta con tus amig@s o descubre nuevas personas en UniRed.',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};
export default function Search() {
  return (
    <div className='w-[90%] m-auto max-w-[500px]'>
      <SearchMobile />
    </div>
  );
}
