'use client';
import dynamic from 'next/dynamic';
import { DivPublicar } from '@/ui/container';
import { user, isConnect, notificacionesUser } from '@/lib/atom';
import { NotificacionesUser } from '@/lib/hook';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const SkeletonNoti = dynamic(() => import('@/ui/skeleton').then((mod) => mod.SkeletonNoti));
const ButtonMasPubli = dynamic(() =>
  import('../publicaciones/styled').then((mod) => mod.ButtonMasPubli)
);
const ButtonNoti = dynamic(() => import('@/ui/boton').then((mod) => mod.ButtonNoti));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));
const Link = dynamic(() => import('next/link'));

export function TemNoti() {
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  const dataUser = useRecoilValue(user);
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
        ? notificacionesUserAtom.publicacion.map((e) => (
            <Link href={'/notificaciones/' + e.id} key={e.id}>
              <ButtonNoti visto={!e.open} id={e.id.toString()}>
                <FotoPerfil
                  className='w-[40px] h-[40px]'
                  img={
                    e.commentPublis
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id)?.user?.img
                  }
                  connect={
                    dataIsConnect?.find((eConnect: any) => {
                      const userComment = e.commentPublis
                        ?.slice()
                        .reverse()
                        .find((e: any) => e.userId !== dataUser.user.id);
                      return userComment?.user.id == eConnect.id;
                    })?.connect && true
                  }
                />
                <p className='w-[90%]'>
                  Nueva comentario en tu publicacion de{' '}
                  {
                    e.commentPublis
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id)?.user?.fullName
                  }
                </p>
              </ButtonNoti>
            </Link>
          ))
        : 'Sin notificaciones'}
      {isLoadingNotiSwr ? <SkeletonNoti /> : null}
      {dataNotiSwr?.length ? (
        <div className='backdrop-contrast-50'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </DivPublicar>
  );
}
