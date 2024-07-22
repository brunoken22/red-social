'use client';
import dynamic from 'next/dynamic';
import {user, publicacionAmigos} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {useState} from 'react';
import {GetAllPublicaciones} from '@/lib/hook';

const DivAllPublicaciones = dynamic(
  () => import('@/ui/container').then((mod) => mod.DivAllPublicaciones),
  {ssr: false}
);
const ButtonMasPubli = dynamic(
  () => import('./styled').then((mod) => mod.ButtonMasPubli),
  {ssr: false}
);
const ThemplatePubli = dynamic(
  () => import('../templatePublicate').then((mod) => mod.ThemplatePubli),
  {ssr: false}
);
const SkeletonPublicacionAll = dynamic(
  () => import('@/ui/skeleton').then((mod) => mod.SkeletonPublicacionAll),
  {ssr: false}
);

export default function PublicacionesAll() {
  const publicacionesAmigos = useRecoilValue(publicacionAmigos);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);

  const {dataPubliAllAmigosSwr, isLoadingAllAmigos} =
    GetAllPublicaciones(pagePubli);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAllAmigosSwr?.length) {
      return;
    }
    setPagePubli((prevPagePubli) => prevPagePubli + 10);
  };

  return (
    <div className='flex flex-col gap-4'>
      {publicacionesAmigos ? (
        publicacionesAmigos.length ? (
          <>
            {publicacionesAmigos.map((item) => (
              <DivAllPublicaciones key={item.id}>
                <ThemplatePubli
                  vereficationUser={dataUser.user.verification}
                  description={item.description}
                  img={item.img}
                  fecha={item.createdAt}
                  like={item.likePublics}
                  comentarios={item.commentPublis}
                  id={item.userId}
                  imgUserPro={dataUser?.user?.img}
                  idPublicacion={item.id}
                  userId={dataUser?.user?.id}
                  user={item.user}
                />
              </DivAllPublicaciones>
            ))}
            {dataPubliAllAmigosSwr?.length ? (
              <div className='text-center m-4'>
                <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
              </div>
            ) : null}
          </>
        ) : (
          <p className='text-center'>No hay publicaciones</p>
        )
      ) : null}
      {isLoadingAllAmigos ? <SkeletonPublicacionAll /> : null}
    </div>
  );
}
