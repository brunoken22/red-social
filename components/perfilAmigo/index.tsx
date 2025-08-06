"use client";
import dynamic from "next/dynamic";
import FotoPerfil from "@/ui/FotoPerfil";
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoNameLink,
  DivPublicaciones,
  DivButtonEliAcep,
} from "../perfilUser/styled";
import { useEffect, useState } from "react";
import {
  user,
  isConnect,
  getAllSolicitudesRecibidas,
  publicacionSearchUser,
  getAllAmigos,
} from "@/lib/atom";
import { useRecoilValue } from "recoil";
import { GetPubliAmigo } from "@/lib/hook";
import { useParams } from "next/navigation";
import { DivAllPublicaciones } from "@/ui/container";
import { ButtonAgregar } from "@/ui/boton";
import MessageSvg from "@/ui/icons/chat.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa"; // Icono de entrada
import { FiUser, FiSearch } from "react-icons/fi";
import { SkeletonPublicacionAll } from "@/ui/skeleton";

const Verification = dynamic(() => import("@/ui/verification"));
const LoaderRequest = dynamic(() => import("../loader").then((mod) => mod.LoaderRequest));

const ButtonMasPubli = dynamic(() =>
  import("../publicaciones/styled").then((mod) => mod.ButtonMasPubli)
);
const SkeletonPerfilAmigo = dynamic(() =>
  import("@/ui/skeleton").then((mod) => mod.SkeletonPerfilAmigo)
);
const ThemplatePubli = dynamic(
  () => import("../templatePublicate").then((mod) => mod.ThemplatePubli),
  { loading: () => <SkeletonPublicacionAll /> }
);

export function PerfilAmigo({ data }: { data: any }) {
  const { id } = useParams();
  const { push } = useRouter();
  const useAmigosAll = useRecoilValue(getAllAmigos);
  const dataIsConnect = useRecoilValue(isConnect);
  const soliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataUser = useRecoilValue(user);
  const publicacionesAmigo = useRecoilValue(publicacionSearchUser);
  const {
    dataPubliAmigo,
    isLoadingGetFriend,
    isError,
    loadMore,
    isReachingEnd,
    mutatePublicacionesUser,
  } = GetPubliAmigo(id as string);
  const [isAmigo, setIsAmigo] = useState<"ACCEPTED" | "PENDING" | "REJECTED">();

  useEffect(() => {
    if (data) {
      setIsAmigo(data.amigo);
      return;
    }
  }, [data]);

  const handleSolicitudAcep = async (e: any) => {
    const id = e.target.id;
    const aceptarSolicitud = await import("@/lib/hook").then((mod) => mod.aceptarSolicitud);
    await aceptarSolicitud(Number(id));
    setIsAmigo("ACCEPTED");
  };
  const handleSolicitudEnv = async (e: any) => {
    const createSolicitud = await import("@/lib/hook").then((mod) => mod.createSolicitud);
    const id = e.target.id;
    await createSolicitud({
      amigoId: Number(id),
    });
    setIsAmigo("PENDING");
  };
  const handleSolicitudRecha = async (e: any) => {
    const id = e.target.id;
    const rechazarSolicitud = await import("@/lib/hook").then((mod) => mod.rechazarSolicitud);
    await rechazarSolicitud({
      userId: Number(id),
    });
    setIsAmigo("REJECTED");
  };
  const handleEliminarAmigo = async (e: any) => {
    const id = e.target.id;
    const eliminarAmigo = await import("@/lib/hook").then((mod) => mod.eliminarAmigo);
    await eliminarAmigo(Number(id));
    setIsAmigo("REJECTED");
  };

  return (
    <>
      {!isLoadingGetFriend ? (
        <>
          {data && data.user ? (
            <DivPerfilUser>
              <div>
                <div className='w-full aspect-[16/9] max-h-[350px] max-md:aspect-[4/3] max-md:max-h-[200px]'>
                  <img
                    src='/portafolio.webp'
                    alt='portada'
                    className='rounded-md w-full h-full object-cover'
                  />
                </div>
                <DivHeadPerfil>
                  <DivFotoNameLink>
                    {data?.user?.id && (
                      <FotoPerfil
                        className='w-[120px] h-[120px]'
                        img={data?.user?.img}
                        connect={
                          dataIsConnect?.find((e: any) => e.id == data?.user?.id)?.connect && true
                        }
                        isBorder
                      />
                    )}
                    <div className='max-md:flex max-md:items-center items-end  max-md:flex-col  '>
                      <div className='flex gap-2 items-center'>
                        <h2 className='font-semibold text-2xl max-w-[250px] whitespace-nowrap overflow-hidden text-ellipsis'>
                          {data?.user?.fullName}
                        </h2>
                        {data.user.verification ? <Verification publication={false} /> : null}
                      </div>
                      {useAmigosAll.data && useAmigosAll.data.length ? (
                        <div className='max-md:mb-2 mb-0 -mt-1'>
                          {useAmigosAll.data.length + " amigos"}
                        </div>
                      ) : (
                        <div className='max-md:mb-2 mb-0 -mt-1'>No hay amigos</div>
                      )}
                    </div>
                  </DivFotoNameLink>
                  <div className='flex gap-2 items-center max-md:flex-col  flex-row'>
                    {!isLoadingGetFriend ? (
                      dataUser.user.id ? (
                        <>
                          {isAmigo == "ACCEPTED" ? (
                            <Link
                              className=' p-2 rounded-lg text-primary flex items-center gap-1 backdrop-contrast-[0.4] hover:backdrop-contrast-[0.1]'
                              href={
                                "/chat?fullName=" +
                                data.user.fullName +
                                "&rtdb=" +
                                data.user.rtdb +
                                "&id=" +
                                data.user.id +
                                "&img=" +
                                (data.user.img ? data.user.img : "")
                              }
                            >
                              <MessageSvg className='fill-primary w-[20px] text-nowrap' />
                              Mensaje
                            </Link>
                          ) : null}
                          {isAmigo !== "PENDING" ? (
                            <ButtonAgregar
                              id={data?.user?.id}
                              onClick={
                                isAmigo == "ACCEPTED" ? handleEliminarAmigo : handleSolicitudEnv
                              }
                              bg={isAmigo !== "REJECTED" ? "red" : "blue"}
                            >
                              {isAmigo == "ACCEPTED" ? "Eliminar Amigo" : "Agregar"}
                            </ButtonAgregar>
                          ) : isAmigo == "PENDING" &&
                            soliReci?.find((user) => user.id == data?.user.id) ? (
                            <DivButtonEliAcep>
                              <ButtonAgregar
                                id={data?.user?.id}
                                onClick={handleSolicitudRecha}
                                bg='red'
                              >
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
                              bg='red'
                            >
                              Eliminar solicitud
                            </ButtonAgregar>
                          )}
                        </>
                      ) : (
                        <ButtonAgregar
                          className='flex justify-center gap-3 items-center'
                          bg='blue'
                          id={"Conectar"}
                          onClick={() => push("/iniciarSesion")}
                        >
                          <FaSignInAlt />
                          Iniciar sesión para interactuar
                        </ButtonAgregar>
                      )
                    ) : (
                      <LoaderRequest />
                    )}
                  </div>
                </DivHeadPerfil>
              </div>
              <DivPublicaciones>
                {publicacionesAmigo ? (
                  publicacionesAmigo.length ? (
                    publicacionesAmigo.map((item) => (
                      <DivAllPublicaciones key={item.id}>
                        <ThemplatePubli
                          mutate={mutatePublicacionesUser}
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
                {!isReachingEnd && !isLoadingGetFriend ? (
                  <div className='text-center'>
                    <ButtonMasPubli onClick={loadMore}>Más</ButtonMasPubli>
                  </div>
                ) : null}
              </DivPublicaciones>
            </DivPerfilUser>
          ) : (
            <div className='flex items-center justify-center  bg-gray-100 dark:bg-gray-900 m-auto'>
              <div className='p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md w-full'>
                <FiUser className='w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-6' />
                <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center'>
                  No se encontró usuario
                </h2>
                <p className='text-gray-600 dark:text-gray-300 mb-6 text-center'>
                  Lo sentimos, no pudimos encontrar el usuario que estás buscando. Por favor,
                  verifica la información e intenta nuevamente.
                </p>
                <div className='flex justify-center'>
                  <button
                    onClick={() => push("/amigos")}
                    className='flex items-center px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800'
                  >
                    <FiSearch className='mr-2' />
                    Buscar amigos
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <SkeletonPerfilAmigo />
      )}
    </>
  );
}
