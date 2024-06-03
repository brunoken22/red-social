import {DivAllPublicaciones} from '@/ui/container';
import {ButtonMasPubli} from './styled';
import {publicacionUser, user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {useState} from 'react';
import {GetAllPublicacionesUser} from '@/lib/hook';
import {Loader} from '../loader';
import {ThemplatePubli} from '../templatePublicate';

export function PublicacionesUser() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);

  const {dataPubliAllAmigosSwr, isLoadingAllAmigos} =
    GetAllPublicacionesUser(pagePubli);
  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAllAmigosSwr?.length) {
      return;
    }
    setPagePubli((prevPagePubli) => prevPagePubli + 10);
  };

  return (
    <div className='flex flex-col gap-4'>
      {publicacionesUser?.length > 0 ? (
        publicacionesUser.map((item) => (
          <DivAllPublicaciones key={item.id}>
            <ThemplatePubli
              description={item.description}
              img={item.img}
              fecha={item.updatedAt}
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
        <p style={{textAlign: 'center'}}>No hay publicaciones</p>
      )}
      {dataPubliAllAmigosSwr?.length ? (
        <div style={{textAlign: 'center'}}>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
      {isLoadingAllAmigos && (
        <div style={{position: 'relative', margin: '1rem'}}>
          <Loader></Loader>
        </div>
      )}
    </div>
  );
}
