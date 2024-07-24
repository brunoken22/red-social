'use client';
import FotoPerfil from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoNameLink,
  DivPublicaciones,
  DivButtonEliAcep,
} from '../perfilUser/styled';
import {useEffect, useState} from 'react';
import {
  user,
  isConnect,
  getAllSolicitudesRecibidas,
  publicacionSearchUser,
} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {
  GetAmigo,
  EliminarAmigo,
  createSolicitud,
  rechazarSolicitud,
  AceptarSolicitud,
  GetPubliAmigo,
} from '@/lib/hook';
import {useParams} from 'next/navigation';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonAgregar} from '@/ui/boton';
import MessageSvg from '@/ui/icons/chat.svg';
import {ButtonMasPubli} from '../publicaciones/styled';
import {SkeletonPerfilAmigo} from '@/ui/skeleton';
import {ThemplatePubli} from '../templatePublicate';
import {useRouter} from 'next/navigation';
import {Loader} from '../loader';
import Verification from '@/ui/verification';
import Link from 'next/link';

export function PerfilAmigo() {
  const {id} = useParams();
  const {push} = useRouter();
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const {data} = GetAmigo(id as string);
  const {dataPubliAmigo} = GetPubliAmigo(id as string, pagePubli);
  const [isAmigo, setIsAmigo] = useState<'ACCEPTED' | 'PENDING' | 'REJECTED'>();
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));
  const {dataElimAmigo, isLoadingElimAmigo} = EliminarAmigo({
    userId: eliminarAmigo,
  });
  const {dataAcep, isLoadingAcep} = AceptarSolicitud({
    amigoId: acepAmigoId,
  });
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
  useEffect(() => {
    if (dataElimAmigo) {
      setEliminarAmigo(-1);
      return;
    }
    if (dataAcep) {
      setAcepAmigoId(-1);
      return;
    }
  }, [dataElimAmigo, dataAcep]);
  const handleSolicitudAcep = (e: any) => {
    const id = e.target.id;
    setAcepAmigoId(Number(id));
    setIsAmigo('ACCEPTED');
  };
  const handleSolicitudEnv = async (e: any) => {
    setIsLoading(true);

    const id = e.target.id;
    await createSolicitud({
      amigoId: Number(id),
    });
    setIsLoading(false);
  };
  const handleSolicitudRecha = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);
    await rechazarSolicitud({
      userId: Number(id),
    });
    setIsLoading(false);
  };
  const handleEliminarAmigo = (e: any) => {
    const id = e.target.id;
    setEliminarAmigo(Number(id));
    setIsAmigo('REJECTED');
  };
  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAmigo?.length) {
      return;
    }
    setPagePubli((prevPagePubli) => prevPagePubli + 10);
  };
  return data && data.user ? (
    <>
      <DivPerfilUser>
        <DivHeadPerfil>
          <DivFotoNameLink>
            {data?.user?.id && (
              <FotoPerfil
                className='w-[80px] h-[80px]'
                img={data?.user?.img}
                connect={
                  dataIsConnect?.find((e: any) => e.id == data?.user?.id)
                    ?.connect && true
                }
              />
            )}
            <div className='flex gap-2 items-center max-md:mb-4'>
              <h2 className='  font-bold text-2xl max-w-[250px] truncate'>
                {data.user.fullName}
              </h2>
              {data.user.verification ? (
                <Verification publication={false} />
              ) : null}
            </div>
          </DivFotoNameLink>
          <div className='flex gap-2 items-center max-md:flex-col  flex-row'>
            <Link
              className=' p-2 rounded-lg text-primary flex items-center gap-1 backdrop-contrast-[0.4] hover:backdrop-contrast-[0.1]'
              href={
                '/chat?fullName=' +
                data.user.fullName +
                '&rtdb=' +
                data.user.rtdb +
                '&id=' +
                data.user.id +
                '&img=' +
                data.user.img
              }>
              <MessageSvg className='fill-primary w-[20px] text-nowrap' />
              Mensaje
            </Link>
            {isAmigo !== 'PENDING' ? (
              <ButtonAgregar
                id={data?.user?.id}
                onClick={
                  isAmigo == 'ACCEPTED'
                    ? handleEliminarAmigo
                    : handleSolicitudEnv
                }
                bg={isAmigo !== 'REJECTED' ? 'red' : 'blue'}>
                {isAmigo == 'ACCEPTED' ? 'Eliminar Amigo' : 'Agregar'}
              </ButtonAgregar>
            ) : isAmigo == 'PENDING' &&
              soliReci?.find((user) => user.id == data?.user.id) ? (
              <DivButtonEliAcep>
                <ButtonAgregar
                  id={data?.user?.id}
                  onClick={handleSolicitudRecha}
                  bg='red'>
                  Eliminar solicitud
                </ButtonAgregar>
                <ButtonAgregar
                  id={data?.user?.id}
                  onClick={handleSolicitudAcep}>
                  Aceptar
                </ButtonAgregar>
              </DivButtonEliAcep>
            ) : (
              <ButtonAgregar
                id={data?.user?.id}
                onClick={handleSolicitudRecha}
                bg='red'>
                Eliminar solicitud
              </ButtonAgregar>
            )}
          </div>
        </DivHeadPerfil>
        <DivPublicaciones>
          {publicacionesAmigo ? (
            publicacionesAmigo.length ? (
              publicacionesAmigo.map((item) => (
                <DivAllPublicaciones key={item.id}>
                  <ThemplatePubli
                    vereficationUser={dataUser.user?.verification}
                    description={item.description}
                    img={item.img}
                    fecha={item.createdAt}
                    like={item.likePublics}
                    comentarios={item.commentPublis}
                    imgUserPro={dataUser?.user?.img}
                    id={item.userId}
                    idPublicacion={item.id}
                    userId={dataUser?.user?.id}
                    user={item.user}
                  />
                </DivAllPublicaciones>
              ))
            ) : (
              <p className='text-center'>No hay publicaciones</p>
            )
          ) : null}
        </DivPublicaciones>
      </DivPerfilUser>
      {isLoadingAcep || isLoadingElimAmigo || isLoading ? <Loader /> : null}
      {dataPubliAmigo?.length ? (
        <div className='text-center'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </>
  ) : (
    <SkeletonPerfilAmigo />
  );
}
