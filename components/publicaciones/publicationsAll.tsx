'use client';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonMasPubli} from './styled';
import {user, publicacionAmigos, Publicacion} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {useState} from 'react';
import {GetAllPublicaciones} from '@/lib/hook';
import {SkeletonPublicacionAll} from '@/ui/skeleton';
import {ThemplatePubli} from '../templatePublicate';

export function PublicacionesAll() {
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
            {publicacionesAmigos.map((item: Publicacion) => (
              <DivAllPublicaciones key={item.id}>
                <ThemplatePubli
                  description={item.description}
                  img={item.img}
                  fecha={item.updatedAt}
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
              <div style={{textAlign: 'center'}}>
                <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
              </div>
            ) : null}
          </>
        ) : (
          <p style={{textAlign: 'center'}}>No hay publicaciones</p>
        )
      ) : null}
      {isLoadingAllAmigos ? <SkeletonPublicacionAll /> : null}
    </div>
  );
}
