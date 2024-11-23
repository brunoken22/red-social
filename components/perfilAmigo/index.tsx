'use client';
import dynamic from 'next/dynamic';
import FotoPerfil from '@/ui/FotoPerfil';
import { DivPerfilUser, DivHeadPerfil, DivFotoNameLink, DivPublicaciones, DivButtonEliAcep } from '../perfilUser/styled';
import { useEffect, useState } from 'react';
import { user, isConnect, getAllSolicitudesRecibidas, publicacionSearchUser } from '@/lib/atom';
import { useRecoilValue } from 'recoil';
import { GetAmigo, GetPubliAmigo } from '@/lib/hook';
import { useParams } from 'next/navigation';
import { DivAllPublicaciones } from '@/ui/container';
import { ButtonAgregar } from '@/ui/boton';
import MessageSvg from '@/ui/icons/chat.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';

const Verification = dynamic(() => import('@/ui/verification'));
const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader));
const LoaderRequest = dynamic(() => import('../loader').then((mod) => mod.LoaderRequest));

const ButtonMasPubli = dynamic(() => import('../publicaciones/styled').then((mod) => mod.ButtonMasPubli));
const SkeletonPerfilAmigo = dynamic(() => import('@/ui/skeleton').then((mod) => mod.SkeletonPerfilAmigo));
const ThemplatePubli = dynamic(() => import('../templatePublicate').then((mod) => mod.ThemplatePubli));

export function PerfilAmigo() {
  const { id } = useParams();
  const { push } = useRouter();
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const [isLoading, setIsLoading] = useState(false);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const { data } = GetAmigo(id as string);
  const { dataPubliAmigo, isLoadingGetFriend, size, setSize } = GetPubliAmigo(id as string);
  const [isAmigo, setIsAmigo] = useState<'ACCEPTED' | 'PENDING' | 'REJECTED'>();

  useEffect(() => {
    if (Number(id) === dataUser.user.id) {
      push('/perfil');
      return;
    }
  }, [dataUser]);
  useEffect(() => {
    if (data) {
      setIsAmigo(data.amigo);
      return;
    }
  }, [data]);

  const handleSolicitudAcep = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);
    const aceptarSolicitud = await import('@/lib/hook').then((mod) => mod.aceptarSolicitud);
    await aceptarSolicitud(Number(id));
    setIsLoading(false);
    setIsAmigo('ACCEPTED');
  };
  const handleSolicitudEnv = async (e: any) => {
    setIsLoading(true);
    const createSolicitud = await import('@/lib/hook').then((mod) => mod.createSolicitud);
    const id = e.target.id;
    await createSolicitud({
      amigoId: Number(id),
    });
    setIsLoading(false);
    setIsAmigo('PENDING');
  };
  const handleSolicitudRecha = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);
    const rechazarSolicitud = await import('@/lib/hook').then((mod) => mod.rechazarSolicitud);
    await rechazarSolicitud({
      userId: Number(id),
    });
    setIsLoading(false);
    setIsAmigo('REJECTED');
  };
  const handleEliminarAmigo = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);
    const eliminarAmigo = await import('@/lib/hook').then((mod) => mod.eliminarAmigo);
    setIsLoading(false);
    await eliminarAmigo(Number(id));
    setIsAmigo('REJECTED');
  };

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAmigo?.length) {
      return;
    }
    setSize(size + 1);
  };

  return data && data.user ? (
    <>
      {/* <head>
        <meta property='og:title' content={data.user.fullName} />
        <meta property='og:description' content='Una hermosa vista al atardecer en la playa con tonos cálidos en el cielo.' />
        <meta property='og:image' content={data.user.img || '/user.webp'} />
        <meta property='og:url' content={`https://unired.vercel.app/amigos/${data.user.id}/${data.user.fullName}`} />
        <meta property='og:type' content='website' />
        <meta property='og:image:alt' content='imagen de perfil' />
      </head> */}
      <DivPerfilUser>
        <DivHeadPerfil>
          <DivFotoNameLink>
            {data?.user?.id && <FotoPerfil className='w-[80px] h-[80px]' img={data?.user?.img} connect={dataIsConnect?.find((e: any) => e.id == data?.user?.id)?.connect && true} />}
            <div className='flex gap-2 items-center max-md:mb-4'>
              <h2 className='text-xl max-w-[250px] truncate'>{data.user.fullName}</h2>
              {data.user.verification ? <Verification publication={false} /> : null}
            </div>
          </DivFotoNameLink>
          <div className='flex gap-2 items-center max-md:flex-col  flex-row'>
            {isLoading ? (
              <LoaderRequest />
            ) : (
              <>
                {' '}
                {isAmigo == 'ACCEPTED' ? (
                  <Link className=' p-2 rounded-lg text-primary flex items-center gap-1 backdrop-contrast-[0.4] hover:backdrop-contrast-[0.1]' href={'/chat?fullName=' + data.user.fullName + '&rtdb=' + data.user.rtdb + '&id=' + data.user.id + '&img=' + (data.user.img ? data.user.img : '')}>
                    <MessageSvg className='fill-primary w-[20px] text-nowrap' />
                    Mensaje
                  </Link>
                ) : null}
                {isAmigo !== 'PENDING' ? (
                  <ButtonAgregar id={data?.user?.id} onClick={isAmigo == 'ACCEPTED' ? handleEliminarAmigo : handleSolicitudEnv} bg={isAmigo !== 'REJECTED' ? 'red' : 'blue'}>
                    {isAmigo == 'ACCEPTED' ? 'Eliminar Amigo' : 'Agregar'}
                  </ButtonAgregar>
                ) : isAmigo == 'PENDING' && soliReci?.find((user) => user.id == data?.user.id) ? (
                  <DivButtonEliAcep>
                    <ButtonAgregar id={data?.user?.id} onClick={handleSolicitudRecha} bg='red'>
                      Eliminar solicitud
                    </ButtonAgregar>
                    <ButtonAgregar id={data?.user?.id} onClick={handleSolicitudAcep}>
                      Aceptar
                    </ButtonAgregar>
                  </DivButtonEliAcep>
                ) : (
                  <ButtonAgregar id={data?.user?.id} onClick={handleSolicitudRecha} bg='red'>
                    Eliminar solicitud
                  </ButtonAgregar>
                )}
              </>
            )}
          </div>
        </DivHeadPerfil>
        <DivPublicaciones>
          {publicacionesAmigo ? (
            publicacionesAmigo.length ? (
              publicacionesAmigo.map((item) => (
                <DivAllPublicaciones key={item.id}>
                  <ThemplatePubli vereficationUser={dataUser.user?.verification} description={item.description} img={item.img} fecha={item.createdAt} like={item.likePublics} comentarios={item.commentPublis} imgUserPro={dataUser?.user?.img} id={item.userId} idPublicacion={item.id} userId={dataUser?.user?.id} user={item.user} />
                </DivAllPublicaciones>
              ))
            ) : (
              <p className='text-center'>No hay publicaciones</p>
            )
          ) : null}
          {dataPubliAmigo?.flat()?.length ? (
            <div className='text-center'>
              <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
            </div>
          ) : null}
        </DivPublicaciones>
      </DivPerfilUser>
      {isLoadingGetFriend ? <Loader /> : null}
    </>
  ) : (
    <SkeletonPerfilAmigo />
  );
}
