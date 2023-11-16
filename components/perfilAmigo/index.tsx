'use client';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoNameLink,
  DivPublicaciones,
  DivButtonEliAcep,
} from '../perfilUser/styled';
import {ThemplatePubli} from '../publicaciones';
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

export function PerfilAmigo() {
  const {id} = useParams();
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const [pagePubli, setPagePubli] = useState(0);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const {data, isLoading} = GetAmigo(id as string, token);
  const {dataPubliAmigo} = GetPubliAmigo(id as string, token, pagePubli);
  const [isAmigo, setIsAmigo] = useState<boolean | 'pendiente'>();
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));
  const [rechazarAmigo, setRechazarAmigo] = useState(Number(-1));
  const [amigoId, setAmigoId] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));
  const {dataElimAmigo} = EliminarAmigo(
    {
      userId: eliminarAmigo,
    },
    token
  );
  const {dataCreateSoli} = CreateSolicitud(
    {
      amigoId,
      estado: false,
    },
    token
  );
  const {dataAcep} = AceptarSolicitud(
    {
      amigoId: acepAmigoId,
      estado: true,
    },
    token
  );
  const {dataRech} = RechazarSolicitud(
    {
      userId: rechazarAmigo,
    },
    token
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
              wid='80'
              hei='80'
              img={data?.user?.img}
              conectHei='15px'
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
              $bg={isAmigo !== false ? 'red' : 'blue'}>
              {isAmigo ? 'Eliminar Amigo' : 'Agregar'}
            </ButtonAgregar>
          ) : isAmigo == 'pendiente' &&
            soliReci?.find((user) => user.id == data?.user.id) ? (
            <DivButtonEliAcep>
              <ButtonAgregar
                id={data?.user?.id}
                onClick={handleSolicitudRecha}
                $bg='red'>
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
              $bg='red'>
              Eliminar solicitud
            </ButtonAgregar>
          )}
        </div>
      </DivHeadPerfil>
      <DivPublicaciones>
        {publicacionesAmigo?.length > 0 ? (
          publicacionesAmigo.map((item: any) => (
            <DivAllPublicaciones key={item.id}>
              <ThemplatePubli
                name={dataUser?.user?.fullName}
                nameUserPerfil={data?.user?.fullName}
                description={item.description}
                img={item.img}
                fecha={item.fecha}
                like={item.like}
                comentarios={item.comentarios}
                imgUserPro={dataUser?.user?.img}
                imgUser={data?.user?.img || 'false'}
                idPublicacion={item.id}
                userId={dataUser?.user?.id}
                id={data?.user?.id}
                token={token}
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
    <Loader />
  );
}
