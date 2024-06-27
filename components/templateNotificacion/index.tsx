'use client';
import {ButtonNoti} from '@/ui/boton';
import {DivAllPublicaciones, DivPublicar} from '@/ui/container';
import FotoPerfil from '@/ui/FotoPerfil';
import {user, isConnect, notificacionesUser} from '@/lib/atom';
import {
  GetPublicacionId,
  NotificacionesUser,
  viewNotification,
} from '@/lib/hook';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {Loader} from '../loader';
import {useEffect, useState} from 'react';
import {ButtonMasPubli} from '../publicaciones/styled';
import {SkeletonNoti} from '@/ui/skeleton';
import {ThemplatePubli} from '../templatePublicate';

export function TemNoti() {
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  const dataUser = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);
  const [offset, setOffset] = useState(0);
  const {dataNotiSwr, isLoadingNotiSwr} = NotificacionesUser(offset);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataNotiSwr?.publicacion?.length) {
      return;
    }
    setOffset((prevPagePubli) => prevPagePubli + 15);
  };

  return (
    <DivPublicar>
      {notificacionesUserAtom.length
        ? notificacionesUserAtom.map((e: any, p: any) => (
            <Link href={'/notificaciones/' + e.id} key={p} id={e.id}>
              <ButtonNoti visto={e.open} id={e.id}>
                <FotoPerfil
                  className='w-[40px] h-[40px]'
                  img={
                    e.commentPublis
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id).user?.img
                  }
                  connect={
                    dataIsConnect?.find((eConnect: any) => {
                      const userComment = e.commentPublis
                        ?.slice()
                        .reverse()
                        .find((e: any) => e.userId !== dataUser.user.id);
                      return userComment?.userId == eConnect.id;
                    })?.connect && true
                  }
                />
                <p className='w-[90%]'>
                  Nueva comentario en tu publicacion de{' '}
                  {
                    e.commentPublis
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id).user
                      ?.fullName
                  }
                </p>
              </ButtonNoti>
            </Link>
          ))
        : 'Sin notificaciones'}
      {isLoadingNotiSwr ? <SkeletonNoti /> : null}
      {dataNotiSwr?.publicacion?.length ? (
        <div style={{textAlign: 'center'}}>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
      {isLoadingNotiSwr && (
        <div style={{position: 'relative', margin: '1rem'}}>
          <Loader></Loader>
        </div>
      )}
    </DivPublicar>
  );
}

export function TemplateNotifiId() {
  const {id} = useParams();
  const {dataPubliId} = GetPublicacionId(id as string);
  const dataUser = useRecoilValue(user);
  useEffect(() => {
    (async () => {
      const data = await viewNotification(id as string);
      return data;
    })();
  }, []);
  return dataPubliId ? (
    <div style={{maxWidth: '600px', width: '100%'}}>
      <DivAllPublicaciones>
        <ThemplatePubli
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
    </div>
  ) : (
    <Loader></Loader>
  );
}
