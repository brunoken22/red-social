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
import {Loader} from '../loader';
import {useParams} from 'next/navigation';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonAgregar} from '@/ui/boton';
import {ButtonMasPubli} from '../publicaciones/styled';
import {SkeletonPerfilAmigo} from '@/ui/skeleton';
import {ThemplatePubli} from '../templatePublicate';

export function PerfilAmigo() {
  const {id} = useParams();
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const {data, isLoading} = GetAmigo(id as string);
  const {dataPubliAmigo} = GetPubliAmigo(id as string,  pagePubli);
  const [isAmigo, setIsAmigo] = useState<boolean | 'pendiente'>();
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));
  const [rechazarAmigo, setRechazarAmigo] = useState(Number(-1));
  const [amigoId, setAmigoId] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));
  const {dataElimAmigo} = EliminarAmigo(
    {
      userId: eliminarAmigo,
    },
  );
  const {dataCreateSoli} = CreateSolicitud(
    {
      amigoId,
      estado: false,
    },
  );
  const {dataAcep} = AceptarSolicitud(
    {
      amigoId: acepAmigoId,
      estado: true,
    },
  );
  const {dataRech} = RechazarSolicitud(
    {
      userId: rechazarAmigo,
    },
  );

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
      return;
    }
    if (dataAcep) {
      setAcepAmigoId(-1);
      return;
    }
    if (dataRech) {
      setRechazarAmigo(-1);
      return;
    }
  }, [dataElimAmigo, dataCreateSoli, dataAcep, dataRech]);
  const handleSolicitudAcep = (e: any) => {
    const id = e.target.id;
    setAcepAmigoId(Number(id));
    setIsAmigo(true);
  };
  const handleSolicitudEnv = (e: any) => {
    const id = e.target.id;
    setAmigoId(Number(id));
    setIsAmigo('pendiente');
  };
  const handleSolicitudRecha = (e: any) => {
    const id = e.target.id;
    setRechazarAmigo(Number(id));
    setIsAmigo(false);
  };
  const handleEliminarAmigo = (e: any) => {
    const id = e.target.id;
    setEliminarAmigo(Number(id));
    setIsAmigo(false);
  };
  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!dataPubliAmigo?.length) {
      return;
    }
    setPagePubli((prevPagePubli) => prevPagePubli + 10);
  };
  return data ? (
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
          <h2 style={{textAlign: 'center', marginTop: '0'}}>
            {data?.user?.fullName}
          </h2>
        </DivFotoNameLink>
        <div>
          {amigoId < 0 && isAmigo !== 'pendiente' ? (
            <ButtonAgregar
              id={data?.user?.id}
              onClick={isAmigo ? handleEliminarAmigo : handleSolicitudEnv}
              bg={isAmigo !== false ? 'red' : 'blue'}>
              {isAmigo ? 'Eliminar Amigo' : 'Agregar'}
            </ButtonAgregar>
          ) : isAmigo == 'pendiente' &&
            soliReci?.find((user) => user.id == data?.user.id) ? (
            <DivButtonEliAcep>
              <ButtonAgregar
                id={data?.user?.id}
                onClick={handleSolicitudRecha}
                bg='red'>
                Eliminar solicitud
              </ButtonAgregar>
              <ButtonAgregar id={data?.user?.id} onClick={handleSolicitudAcep}>
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
        {publicacionesAmigo?.length > 0 ? (
          publicacionesAmigo.map((item) => (
            <DivAllPublicaciones key={item.id}>
              <ThemplatePubli
                name={dataUser?.user?.fullName}
                description={item.description}
                img={item.img}
                fecha={item.updatedAt}
                like={item.likePublics}
                comentarios={item.commentPublis}
                imgUserPro={dataUser?.user?.img}
                idPublicacion={item.id}
                userId={dataUser?.user?.id}
                id={data?.user?.id}
                user={item.user}
              />
            </DivAllPublicaciones>
          ))
        ) : (
          <p style={{textAlign: 'center'}}>No hay publicaciones</p>
        )}
        {dataPubliAmigo?.length ? (
          <div style={{textAlign: 'center'}}>
            <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
          </div>
        ) : null}
        {isLoading && (
          <div style={{position: 'relative', margin: '1rem'}}>
            <Loader></Loader>
          </div>
        )}
      </DivPublicaciones>
    </DivPerfilUser>
  ) : (
    <>
      <SkeletonPerfilAmigo />
    </>
  );
}
