import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';
import type { Metadata, ResolvingMetadata } from 'next';
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = (await params).id;

  // fetch data
  const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/amigos/` + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data.user.fullName + ' | UniRed' || 'Unired',
    openGraph: {
      images: ['/user.webp', ...previousImages],
    },
  };
}

export default function () {
  return (
    <>
      {/* <head>
        <title>data.user.fullName</title>
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
      </head> */}
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
