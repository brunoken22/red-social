import {DivAllPublicaciones} from '@/ui/container';
import {ButtonMasPubli} from './styled';
import {publicacionUser, user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {GetAllPublicacionesUser} from '@/lib/hook';
import {ThemplatePubli} from '../templatePublicate';
import {SkeletonPublicacionAll} from '@/ui/skeleton';

export function PublicacionesUser() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);

  const {dataPubliAllAmigosSwr, isLoading, setSize, size} =
    GetAllPublicacionesUser();
  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAllAmigosSwr?.length) {
      return;
    }
    setSize(size + 1);
  };

  return (
    <div className='flex flex-col gap-4'>
      {publicacionesUser ? (
        publicacionesUser.length ? (
          publicacionesUser.map((item) => (
            <DivAllPublicaciones key={item.id}>
              <ThemplatePubli
                vereficationUser={dataUser.user.verification}
                description={item.description}
                img={item.img}
                fecha={item.createdAt}
                like={item.likePublics}
                comentarios={item.commentPublis}
                imgUserPro={dataUser.user.img}
                id={item.userId}
                idPublicacion={item.id}
                userId={dataUser.user.id}
                user={item.user}
              />
            </DivAllPublicaciones>
          ))
        ) : (
          <p className='text-center'>No hay publicaciones</p>
        )
      ) : null}

      {isLoading && <SkeletonPublicacionAll />}
      {dataPubliAllAmigosSwr?.length ? (
        <div className='text-center'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </div>
  );
}
