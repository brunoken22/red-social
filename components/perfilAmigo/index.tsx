'use client';
import Dropzone from 'dropzone';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoName,
  DivFotoNameLink,
  DivButton,
  DivPublicaciones,
  DivButtonEliAcep,
} from '../perfilUser/styled';
import {Publicar} from '../publicar';
import {PublicacionesUser, ThemplatePubli} from '../publicaciones';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {
  user,
  isConnect,
  getAllSolicitudesRecibidas,
  publicacionSearchUser,
} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import {
  ModificarUser,
  GetAmigo,
  EliminarAmigo,
  CreateSolicitud,
  RechazarSolicitud,
  AceptarSolicitud,
  GetPubliAmigo,
  OptimizarImage,
} from '@/lib/hook';
import {Loader} from '../loader';
import {useParams} from 'next/navigation';
import {DivAllPublicaciones} from '@/ui/container';
import {ButtonAgregar} from '@/ui/boton';
import { useRouter } from 'next/navigation';


export function PerfilAmigo() {
    const {id} = useParams();
    const router = useRouter();
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
    const {dataElimAmigo, isLoadingElimAmigo} = EliminarAmigo(
      {
        userId: eliminarAmigo,
      },
      token
    );
    const {dataCreateSoli, isLoadCreateSoli} = CreateSolicitud(
      {
        amigoId,
        estado: false,
      },
      token
    );
    const {dataAcep, isLoadingAcep} = AceptarSolicitud(
      {
        amigoId: acepAmigoId,
        estado: true,
      },
      token
    );
    const {dataRech, isLoadingRech} = RechazarSolicitud(
      {
        userId: rechazarAmigo,
      },
      token
    );
    useEffect(() => {
      function handleScroll() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.scrollY;
        if (
          scrollPosition + windowHeight >= documentHeight &&
          dataPubliAmigo?.length > 0
        ) {
          setPagePubli((prevPagePubli) => prevPagePubli + 10);
        }
      }
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [dataPubliAmigo]);
    useEffect(() => {
      if (dataUser?.user?.id == data?.user?.id) {
        router.push('/perfil');
        return;
      }
      if (
        isLoading ||
        isLoadingElimAmigo ||
        isLoadCreateSoli ||
        isLoadingRech ||
        isLoadingAcep
      ) {
      }
      if (dataElimAmigo || dataCreateSoli || dataAcep || dataRech || data) {
        setEliminarAmigo(Number(-1));
        setAmigoId(Number(-1));
        setAcepAmigoId(Number(-1));
        setRechazarAmigo(Number(-1));
      }
    }, [
      isLoading,
      isLoadingElimAmigo,
      isLoadCreateSoli,
      isLoadingRech,
      isLoadingAcep,
      dataUser,
      data,
    ]);
    useEffect(() => {
      if (data) {
        setIsAmigo(data.amigo);
      }
    }, [data]);
    const handleSolicitudAcep = (e: any) => {
      const id = e.target.id;
      setAcepAmigoId(Number(id));
      setIsAmigo(true);
    };
    const handleEliminarAmigo = (e: any) => {
      const id = e.target.id;
      setEliminarAmigo(Number(id));
      setIsAmigo(false);
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
  