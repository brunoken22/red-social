'use client';
import dynamic from 'next/dynamic';
import { DivAllPublicaciones } from '@/ui/container';
import { user } from '@/lib/atom';
import { GetPublicacionId, viewNotification } from '@/lib/hook';
import { useRecoilValue } from 'recoil';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { LoaderRequest } from '../loader';

const ThemplatePubli = dynamic(
  () => import('../templatePublicate').then((mod) => mod.ThemplatePubli),
  {
    loading: () => <LoaderRequest />,
  }
);
export default function NotificationId() {
  const { id } = useParams();
  const { dataPubliId } = GetPublicacionId(id as string);
  const dataUser = useRecoilValue(user);

  useEffect(() => {
    (async () => {
      const data = await viewNotification(id as string);
      return data;
    })();
  }, []);

  return (
    <div className='max-w-[600px] w-full'>
      <DivAllPublicaciones>
        {dataPubliId && (
          <ThemplatePubli
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
        )}
      </DivAllPublicaciones>
    </div>
  );
}
