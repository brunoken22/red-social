'use client';
import dynamic from 'next/dynamic';
import {user, publicacionAmigos} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {GetAllPublicaciones} from '@/lib/hook';

const ButtonMasPubli = dynamic(() =>
  import('./styled').then((mod) => mod.ButtonMasPubli)
);
const ThemplatePubli = dynamic(() =>
  import('../templatePublicate').then((mod) => mod.ThemplatePubli)
);
const SkeletonPublicacionAll = dynamic(() =>
  import('@/ui/skeleton').then((mod) => mod.SkeletonPublicacionAll)
);

export default function PublicacionesAll() {
  const publicacionesAmigos = useRecoilValue(publicacionAmigos);
  const dataUser = useRecoilValue(user);

  const {dataPubliAllAmigosSwr, isLoadingAllAmigos, size, setSize} =
    GetAllPublicaciones();

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAllAmigosSwr?.length) {
      return;
    }
    setSize(size + 1);
  };

  return (
    <div className='flex flex-col gap-4'>
      {publicacionesAmigos ? (
        publicacionesAmigos.length ? (
          <>
            {publicacionesAmigos.map((item) => (
              <div
                className='bg-primary flex flex-col gap-4 rounded-md shadow-container  max-md:w-auto  dark:bg-darkComponet dark:text-primary dark:shadow-dark'
                key={item.id}>
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
              </div>
            ))}
          </>
        ) : (
          <p className='text-center'>No hay publicaciones</p>
        )
      ) : null}
      {isLoadingAllAmigos ? <SkeletonPublicacionAll /> : null}
      {dataPubliAllAmigosSwr?.length ? (
        <div className='text-center m-4'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </div>
  );
}
