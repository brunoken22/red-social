'use client';
import dynamic from 'next/dynamic';
import { DivAllPublicaciones } from '@/ui/container';
import { user } from '@/lib/atom';
import { GetPublicacionId, viewNotification } from '@/lib/hook';
import { useRecoilValue } from 'recoil';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { LoaderRequest } from '../loader';
import Link from 'next/link';

const ThemplatePubli = dynamic(
  () => import('../templatePublicate').then((mod) => mod.ThemplatePubli),
  {
    loading: () => <LoaderRequest />,
  }
);
export default function NotificationId() {
  const { id } = useParams();
  const { dataPubliId, mutatePublicacionesUser } = GetPublicacionId(id as string);
  const dataUser = useRecoilValue(user);

  useEffect(() => {
    (async () => {
      const data = await viewNotification(id as string);
      return data;
    })();
  }, [dataPubliId]);

  return (
    <div className='max-w-[600px] w-full'>
      {dataPubliId ? (
        <DivAllPublicaciones>
          <ThemplatePubli
            mutate={mutatePublicacionesUser}
            vereficationUser={dataUser.user?.verification}
            description={dataPubliId.description}
            img={dataPubliId.img}
            fecha={dataPubliId.createdAt}
            like={dataPubliId.likePublics}
            comentarios={dataPubliId.commentPublis}
            imgUserPro={dataUser.user.img}
            id={dataPubliId.userId}
            idPublicacion={dataPubliId.id}
            userId={dataUser.user.id}
            user={dataPubliId.user}></ThemplatePubli>
        </DivAllPublicaciones>
      ) : (
        <div className='dark:bg-darkComponet  shadow-lg rounded-2xl p-8 max-w-md'>
          <h1 className='text-2xl font-bold dark:text-primary text-secundary  mb-4'>
            ⚠️ Publicación no encontrada
          </h1>
          <p className='dark:text-primary text-secundary mb-6'>
            Esta publicación no se puede visualizar. Es posible que haya sido eliminada o no exista.
          </p>
          <Link
            href='/notificaciones'
            className='bg-light  text-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition'>
            Volver a tus notificaciones
          </Link>
        </div>
      )}
    </div>
  );
}
