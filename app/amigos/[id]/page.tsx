import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';
import Head from 'next/head';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Amigos | UniRed',
//   description: 'Amigos',
// };

export default function () {
  return (
    <>
      <Head>
        <title>{'data.user.fullName'} </title>
        <meta property='og:url' content='https://unired.vercel.app/amigos/60' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Fache' />
        <meta property='og:description' content='Usuario Fache de unired' />
        <meta property='og:image' content='https://res.cloudinary.com/dy26iktoi/image/upload/v1722007305/xcxvdpo8k2vma5okxx8a.webp' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='unired.vercel.app' />
        <meta property='twitter:url' content='https://unired.vercel.app/amigos/60' />
        <meta name='twitter:title' content='Fache' />
        <meta name='twitter:description' content='Usuario Fache de unired' />
        <meta name='twitter:image' content='https://res.cloudinary.com/dy26iktoi/image/upload/v1722007305/xcxvdpo8k2vma5okxx8a.webp' />
      </Head>
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
