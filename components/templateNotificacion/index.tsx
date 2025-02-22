'use client';
import dynamic from 'next/dynamic';
import { DivPublicar } from '@/ui/container';
import { user, isConnect, notificacionesUser } from '@/lib/atom';
import { NotificacionesUser } from '@/lib/hook';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
// import MaintenanceMessage from '../MaintenanceMessage';

const SkeletonNoti = dynamic(() => import('@/ui/skeleton').then((mod) => mod.SkeletonNoti));
const ButtonMasPubli = dynamic(() =>
  import('../publicaciones/styled').then((mod) => mod.ButtonMasPubli)
);
const ButtonNoti = dynamic(() => import('@/ui/boton').then((mod) => mod.ButtonNoti));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));
const Link = dynamic(() => import('next/link'));

export function TemNoti() {
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  const dataIsConnect = useRecoilValue(isConnect);
  const [offset, setOffset] = useState(0);
  const { dataNotiSwr, isLoadingNotiSwr } = NotificacionesUser(offset);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!dataNotiSwr?.length) {
      return;
    }
    setOffset((prevPagePubli) => prevPagePubli + 10);
  };
  return (
    <DivPublicar>
      {notificacionesUserAtom && notificacionesUserAtom.publicacion.length
        ? notificacionesUserAtom.publicacion.map((notification, index) => (
            <Link
              href={`/notificaciones/${notification.publicacionId}`}
              key={index}
              className='truncate'>
              <ButtonNoti visto={!notification.read} id={notification.publicacionId.toString()}>
                {/* Imagen del usuario que generó la notificación */}
                <FotoPerfil
                  className='w-[40px] h-[40px]'
                  img={notification.img}
                  connect={
                    dataIsConnect.length
                      ? dataIsConnect.find(
                          (isConnectUser: any) => isConnectUser.id == notification.fromUser
                        )?.connect
                      : false
                  }
                />

                {/* Mensaje según el tipo de notificación */}
                <p className='w-[90%] truncate'>
                  {notification.type === 'like' ? (
                    <>
                      <b>{notification.fullName}</b> le dio{' '}
                      <span className='text-red-500'>like ❤️</span> a tu publicación.
                    </>
                  ) : notification.type === 'comment' ? (
                    <>
                      <b>{notification.fullName}</b> comentó en tu publicación:{' '}
                      <i className=''>{notification.descriptionReduce || 'Ver más...'}</i>
                    </>
                  ) : (
                    'Nueva notificación'
                  )}
                </p>
              </ButtonNoti>
            </Link>
          ))
        : 'Sin notificaciones'}
      {/* {true ? <MaintenanceMessage /> : null} */}
      {isLoadingNotiSwr ? <SkeletonNoti /> : null}
      {false && dataNotiSwr?.length ? (
        <div className='backdrop-contrast-50'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </DivPublicar>
  );
}
