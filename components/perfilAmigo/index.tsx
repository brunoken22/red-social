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
  CreateSolicitud,
  RechazarSolicitud,
  AceptarSolicitud,
  GetPubliAmigo,
} from '@/lib/hook';
import {useParams} from 'next/navigation';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonAgregar} from '@/ui/boton';
import {ButtonMasPubli} from '../publicaciones/styled';
import {SkeletonPerfilAmigo} from '@/ui/skeleton';
import {ThemplatePubli} from '../templatePublicate';
import {useRouter} from 'next/navigation';
import {Loader} from '../loader';

export function PerfilAmigo() {
  const {id} = useParams();
  const {push} = useRouter();
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const {data} = GetAmigo(id as string);
  const {dataPubliAmigo} = GetPubliAmigo(id as string, pagePubli);
  const [isAmigo, setIsAmigo] = useState<'ACCEPTED' | 'PENDING' | 'REJECTED'>();
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));
  const [rechazarAmigo, setRechazarAmigo] = useState(Number(-1));
  const [amigoId, setAmigoId] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));
  const {dataElimAmigo, isLoadingElimAmigo} = EliminarAmigo({
    userId: eliminarAmigo,
  });
  const {dataCreateSoli, isLoadCreateSoli} = CreateSolicitud({
    amigoId,
    estado: false,
  });
  const {dataAcep, isLoadingAcep} = AceptarSolicitud({
    amigoId: acepAmigoId,
    estado: true,
  });
  const {dataRech, isLoadingRech} = RechazarSolicitud({
    userId: rechazarAmigo,
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
    if (dataCreateSoli) {
      setAmigoId(-1);
      setIsAmigo('PENDING');

      return;
    }
    if (dataAcep) {
      setAcepAmigoId(-1);
      return;
    }
    if (dataRech) {
      setIsAmigo('REJECTED');
      setRechazarAmigo(-1);
      return;
    }
  }, [dataElimAmigo, dataCreateSoli, dataAcep, dataRech]);
  const handleSolicitudAcep = (e: any) => {
    const id = e.target.id;
    setAcepAmigoId(Number(id));
    setIsAmigo('ACCEPTED');
  };
  const handleSolicitudEnv = (e: any) => {
    const id = e.target.id;
    setAmigoId(Number(id));
  };
  const handleSolicitudRecha = (e: any) => {
    const id = e.target.id;
    setRechazarAmigo(Number(id));
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
  console.log(isLoadCreateSoli, isLoadingRech);
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
            <h2 className='text-center  font-bold text-2xl max-md:mb-4'>
              {data.user.fullName}
            </h2>
          </DivFotoNameLink>
          <div>
            {amigoId < 1 && isAmigo !== 'PENDING' ? (
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
                    description={item.description}
                    img={item.img}
                    fecha={item.updatedAt}
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
              <p style={{textAlign: 'center'}}>No hay publicaciones</p>
            )
          ) : null}
          {dataPubliAmigo?.length ? (
            <div style={{textAlign: 'center'}}>
              <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
            </div>
          ) : null}
        </DivPublicaciones>
      </DivPerfilUser>
      {isLoadingAcep ||
      isLoadCreateSoli ||
      isLoadingElimAmigo ||
      isLoadingRech ? (
        <Loader />
      ) : null}
    </>
  ) : (
    <SkeletonPerfilAmigo />
  );
}
