'use client';
import {ButtonNoti} from '@/ui/boton';
import {DivAllPublicaciones, DivPublicar} from '@/ui/container';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {publicacionUser, user} from '@/lib/atom';
import {ComentarPublicacion, GetPublicacionId} from '@/lib/hook';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {ThemplatePubli} from '../publicaciones';
import {Loader} from '../loader';
export function TemNoti() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);
  const filtradoPubliUser =
    publicacionesUser.length > 0
      ? publicacionesUser.filter((publi: any) => publi.comentarios.length > 0)
      : [];

  return (
    <DivPublicar>
      {filtradoPubliUser?.length > 0
        ? filtradoPubliUser
            ?.slice()
            .reverse()
            .map((e: any, p: any) => (
              <Link
                href={'/notificaciones/' + e.id}
                key={p}
                id={e.id}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  borderBottom: '1px solid #2f2f2f',
                }}>
                <ButtonNoti $visto={e.open} id={e.id}>
                  <FotoPerfil
                    img={
                      e.comentarios
                        ?.slice()
                        .reverse()
                        .find((e: any) => e.userId !== dataUser.user.id)?.img
                    }
                  />
                  <p>
                    Nueva comentario en tu publicacion de{' '}
                    {
                      e.comentarios
                        ?.slice()
                        .reverse()
                        .find((e: any) => e.userId !== dataUser.user.id)
                        ?.fullName
                    }
                  </p>
                </ButtonNoti>
              </Link>
            ))
        : 'Sin notificaciones'}
    </DivPublicar>
  );
}
export function TemplateNotifiId() {
  const {id} = useParams();
  const {dataPubliId, isLoadGetPubliId} = GetPublicacionId(id as string);
  const dataUser = useRecoilValue(user);
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {dataComentar, isLoadingComentar} = ComentarPublicacion(
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
