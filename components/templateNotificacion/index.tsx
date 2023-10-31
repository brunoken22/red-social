'use client';
import {ButtonNoti} from '@/ui/boton';
import {DivAllPublicaciones, DivPublicar} from '@/ui/container';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {user, isConnect, notificacionesUser, Publicacion} from '@/lib/atom';
import {
  ComentarPublicacion,
  GetPublicacionId,
  NotificacionesUser,
} from '@/lib/hook';
import {useRecoilValue, useRecoilState} from 'recoil';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {ThemplatePubli} from '../publicaciones';
import {Loader} from '../loader';
import {useState, useEffect} from 'react';

export function TemNoti() {
  const [notificacionesUserAtom, setNotificacionesUserAtom] =
    useRecoilState(notificacionesUser);
  const dataUser = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const [offset, setOffset] = useState(0);
  const {dataNotiSwr, isLoadingNotiSwr} = NotificacionesUser(token, offset);
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      if (scrollPosition + windowHeight >= documentHeight) {
        if (dataNotiSwr?.publicacion.length < 1) {
          return;
        }
        setOffset((prevPagePubli: number) => prevPagePubli + 10);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (dataNotiSwr?.offset) {
      setOffset(dataNotiSwr.offset);
    }
  }, [dataNotiSwr]);
  return (
    <DivPublicar>
      {notificacionesUserAtom.length > 0
        ? notificacionesUserAtom.map((e: any, p: any) => (
            <Link
              href={'/notificaciones/' + e.id}
              key={p}
              id={e.id}
              style={{
                textDecoration: 'none',
                color: '#fff',
                fontSize: '1rem',
                borderBottom: '1px solid #2f2f2f',
              }}
              onClick={() =>
                setNotificacionesUserAtom((prev: any) => {
                  const newData = prev.map((item: Publicacion) => {
                    if (item.id == e.id) {
                      return {...item, open: false};
                    }
                    return item;
                  });
                  return newData;
                })
              }>
              <ButtonNoti $visto={e.open} id={e.id}>
                <FotoPerfil
                  wid='40'
                  hei='40'
                  img={
                    e.comentarios
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id)?.img
                  }
                  connect={
                    dataIsConnect?.find((eConnect: any) => {
                      const userComment = e.comentarios
                        ?.slice()
                        .reverse()
                        .find((e: any) => e.userId !== dataUser.user.id);
                      return userComment?.userId == eConnect.id;
                    })?.connect && true
                  }
                />
                <p>
                  Nueva comentario en tu publicacion de{' '}
                  {
                    e.comentarios
                      ?.slice()
                      .reverse()
                      .find((e: any) => e.userId !== dataUser.user.id)?.fullName
                  }
                </p>
              </ButtonNoti>
            </Link>
          ))
        : 'Sin notificaciones'}
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
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {dataPubliId} = GetPublicacionId(token, id as string);
  const dataUser = useRecoilValue(user);
  const {isLoadingComentar} = ComentarPublicacion(
    {
      id,
      open: false,
      click: true,
    },
    token
  );
  if (isLoadingComentar) {
    return <Loader></Loader>;
  }
  return dataPubliId ? (
    <div style={{maxWidth: '600px', width: '100%'}}>
      <DivAllPublicaciones>
        <ThemplatePubli
          name={dataUser?.user.fullName}
          description={dataPubliId.description}
          img={dataPubliId.img}
          fecha={dataPubliId.fecha}
          like={dataPubliId.like}
          comentarios={dataPubliId.comentarios}
          imgUserPro={dataUser.user.img}
          id={dataPubliId.userId}
          idPublicacion={dataPubliId.id}
          userId={dataUser.user.id}></ThemplatePubli>
      </DivAllPublicaciones>
    </div>
  ) : (
    <Loader></Loader>
  );
}
