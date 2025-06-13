'use client';
import dynamic from 'next/dynamic';
import { user, publicacionAmigos } from '@/lib/atom';
import { useRecoilValue } from 'recoil';
import { GetAllPublicaciones } from '@/lib/hook';
import { SkeletonPublicacionAll } from '@/ui/skeleton';

const ButtonMasPubli = dynamic(() => import('./styled').then((mod) => mod.ButtonMasPubli));
const ThemplatePubli = dynamic(() =>
  import('../templatePublicate').then((mod) => mod.ThemplatePubli)
);

export default function PublicacionesAll() {
  const publicacionesAmigos = useRecoilValue(publicacionAmigos);
  const dataUser = useRecoilValue(user);

  const { dataPubliAllAmigosSwr, isLoadingAllAmigos, size, setSize, mutate } =
    GetAllPublicaciones();

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (dataPubliAllAmigosSwr?.[dataPubliAllAmigosSwr.length - 1]?.length === 0) {
      return;
    }
    setSize(size + 1);
  };

  return (
    <div className='flex flex-col gap-4 pb-3'>
      {isLoadingAllAmigos && dataUser.isLoading ? (
        <SkeletonPublicacionAll />
      ) : (
        <>
          {publicacionesAmigos ? (
            publicacionesAmigos.length ? (
              <>
                {publicacionesAmigos.map((item) => (
                  <div
                    key={item.id}
                    className='bg-primary flex flex-col gap-4 rounded-md   max-md:w-auto  dark:bg-darkComponet dark:text-primary '>
                    <ThemplatePubli
                      mutate={mutate}
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

          {dataPubliAllAmigosSwr?.[dataPubliAllAmigosSwr.length - 1]?.length > 0 ? (
            <div className='text-center m-4'>
              <ButtonMasPubli onClick={handleMasPubli}>Ver más</ButtonMasPubli>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
