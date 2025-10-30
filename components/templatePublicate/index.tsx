"use client";
import dynamic from "next/dynamic";
import { Body } from "@/ui/typography";
import {
  DivPerfil,
  DivSpan,
  DivInteractuar,
  BottonLike,
  SpanIco,
  DivPefilDelete,
  ButtonDelete,
  ButtonOpenDelete,
  DivUserLikes,
} from "@/components/publicaciones/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeletePublic } from "@/lib/hook";
import diferenteDate from "./diferenteDate";
import { useDebouncedCallback } from "use-debounce";
import Linkify from "@/utils/formtText";
import { LoaderRequest } from "../loader";
import GalleryMedia from "../publicar/galleryImage";
import { FaRegComment, FaComment } from "react-icons/fa";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FaEllipsisH } from "react-icons/fa";
import { FiShare2, FiUser } from "react-icons/fi";
import { Media, useIsConnected } from "@/lib/store";

const Verification = dynamic(() => import("@/ui/verification"));
const Comment = dynamic(() => import("./comment"));
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"), { loading: () => <LoaderRequest /> });

export function ThemplatePubli(props: {
  description?: string;
  vereficationUser: boolean;
  media?: Media[];
  fecha: string;
  like: any[];
  comentarios: any[];
  id: number;
  imgUserPro?: string;
  idPublicacion: number;
  userId: number;
  user: any;
  mutate?: any;
}) {
  const [like, setLike] = useState<"like" | "disLike">();
  const [comentario, setComentario] = useState(
    props.comentarios?.length && props.comentarios.length > 0 && props.comentarios.length < 3
      ? true
      : false
  );
  const [openDelete, setOpenDelete] = useState(false);
  const connected = useIsConnected((state) => state.connected);
  const [publiId, setPubliId] = useState<number>(-1);
  const [totalLike, setTotalLike] = useState(props.like?.length || 0);
  const [userLikes, setUserLikes] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const debounced = useDebouncedCallback(async () => {
    const likeODisLike = (await import("@/lib/hook")).likeODisLike;
    await likeODisLike(props.idPublicacion.toString());
  }, 500);
  const { dataDelete, isLoadingDeletePubli } = DeletePublic(publiId);

  useEffect(() => {
    const isLike =
      props?.like?.length > 0 ? props.like?.find((e: any) => e.user.id == props.userId) : false;
    setLike(!isLike ? "disLike" : "like");

    setTotalLike(props.like?.length);
  }, [props.like, props.userId]);

  useEffect(() => {
    if (dataDelete) {
      props.mutate();
      setPubliId(-1);
      return;
    }
  }, [dataDelete]);

  const handleClickLike = async (e: any) => {
    e.preventDefault();
    if (like == "like") {
      setLike("disLike");
      setTotalLike(totalLike - 1);
    } else {
      setTotalLike(totalLike + 1);
      setLike("like");
    }
    await debounced();
  };

  const handleClickOpenComen = (e: any) => {
    e.preventDefault();
    if (!comentario) {
      setComentario(true);
      return;
    }
    setComentario(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Publicación",
          text: "Mira esta publicación",
          url: "/notificaciones/" + props.idPublicacion || window.location.href,
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      // Lógica alternativa (copiar enlace al portapapeles)
      navigator.clipboard.writeText(
        "/notificaciones/" + props.idPublicacion || window.location.href
      );
      alert("Enlace copiado al portapapeles");
    }
  };

  const needsToggle = props?.description?.length ? props?.description?.length > 500 : "";
  const displayText = isExpanded ? props.description : props?.description?.slice(0, 500);

  return (
    <div className={`w-full relative`}>
      <DivPefilDelete>
        <DivPerfil>
          {props.user && props.user?.id !== props.userId ? (
            <Link href={"/amigos/" + props.id}>
              <FotoPerfil
                img={props?.user?.img}
                className='h-[40px] w-[40px]  '
                connect={connected.find((e: any) => e.id == props.id)?.connect && true}
                title={props.user.fullName}
              ></FotoPerfil>
            </Link>
          ) : (
            <FotoPerfil
              img={props?.user?.img}
              className='h-[40px] w-[40px]'
              connect={connected.find((e: any) => e.id == props.id)?.connect && true}
              title={props.user.fullName}
            ></FotoPerfil>
          )}
          <div className='flex flex-col '>
            <div className='flex items-center gap-2'>
              {props.user && props.user?.id !== props.userId ? (
                <Link href={"/amigos/" + props.id} className='hover:opacity-70'>
                  <Body>{props.user?.id == props.userId ? "Tú" : props.user.fullName}</Body>
                </Link>
              ) : (
                <Body>
                  {props.user && props.user?.id == props.userId ? "Tú" : props.user.fullName}
                </Body>
              )}

              {props.user.verification ? <Verification publication={true} /> : null}
            </div>
            <span className='text-[0.7rem] '>{diferenteDate(props.fecha)}</span>
          </div>
        </DivPerfil>
        {props.id == props.userId ? (
          <div className='relative'>
            <ButtonOpenDelete
              onClick={() => setOpenDelete(!openDelete)}
              aria-label='EliminarContet'
            >
              <FaEllipsisH className='text-gray-600 dark:text-gray-300' />
            </ButtonOpenDelete>
            {openDelete && (
              <ButtonDelete
                aria-label='Eliminar'
                onClick={() => {
                  setPubliId(props.idPublicacion);
                  setOpenDelete(false);
                }}
              >
                Eliminar
              </ButtonDelete>
            )}
          </div>
        ) : null}
      </DivPefilDelete>
      {props.description?.length && displayText ? (
        <div className='p-6 pt-0 pb-1 text-[0.9rem] font-thin break-words overflow-hidden'>
          <p className='max-w-full whitespace-pre-wrap overflow-wrap-break-word'>
            <Linkify text={displayText} />
          </p>
          {needsToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-blue-500 hover:text-blue-700 font-medium mt-1 focus:outline-none'
            >
              {isExpanded ? "Leer menos" : "Leer más"}
            </button>
          )}
        </div>
      ) : null}

      {props.media?.length ? (
        <div className=''>
          <GalleryMedia media={props.media} />{" "}
        </div>
      ) : null}

      <DivInteractuar>
        {/* Sección Me gusta */}
        <div className='flex flex-col items-center w-full '>
          <div className=' w-full pt-1 pb-1 justify-around gap-0 border-b-[1px] border-[#8a8a8aea]'>
            {totalLike > 0 ? (
              <SpanIco
                onMouseEnter={() => setUserLikes(true)}
                onMouseLeave={() => setUserLikes(false)}
              >
                <DivSpan>{totalLike} Me gusta</DivSpan>
                {userLikes && (
                  <DivUserLikes>
                    {props.like.map((e: any) => (
                      <div
                        key={e.id}
                        className='w-full whitespace-nowrap overflow-hidden text-ellipsis m-0 flex items-center gap-1'
                      >
                        <FiUser className='inline' size='20' />
                        {e.user.id !== props.userId ? e.user.fullName : "Tú"}
                      </div>
                    ))}
                  </DivUserLikes>
                )}
                <div className='p-1 rounded-full bg-blue-500 text-white'>
                  <IoHeart size='9' />
                </div>
              </SpanIco>
            ) : props?.comentarios.length ? (
              <SpanIco>
                <hr />
              </SpanIco>
            ) : null}
          </div>
          <BottonLike
            disabled={!props.userId}
            type='button'
            onClick={handleClickLike}
            like={like === "like"}
            id={props.idPublicacion.toString()}
          >
            {like === "like" ? (
              <IoHeart className='text-blue-500 dark:text-blue-400' size='20' />
            ) : (
              <IoHeartOutline className='dark:text-gray-300 text-gray-500' size='20' />
            )}
            Me gusta
          </BottonLike>
        </div>

        {/* Sección Comentarios */}
        <div className='flex flex-col items-center w-full'>
          <div className=' w-full pt-1 pb-1 justify-around gap-0 border-b-[1px] border-[#8a8a8aea]'>
            {props.comentarios?.length > 0 ? (
              <SpanIco>
                <DivSpan>{props.comentarios.length} Comentarios</DivSpan>
              </SpanIco>
            ) : totalLike > 0 ? (
              <SpanIco>
                <hr />
              </SpanIco>
            ) : null}
          </div>
          <BottonLike
            onClick={handleClickOpenComen}
            type='button'
            id={"comentario" + Number(props.idPublicacion)}
          >
            {comentario ? (
              <FaComment className='text-green-500' size='20' />
            ) : (
              <FaRegComment className='dark:text-gray-300 text-gray-500' size='20' />
            )}
            Comentar
          </BottonLike>
        </div>

        {/* Sección Compartir */}
        <div className='flex flex-col items-center w-full'>
          <div className=' w-full pt-1 pb-1 justify-around gap-0 border-b-[1px] border-[#8a8a8aea]'>
            {totalLike || props.comentarios.length ? (
              <SpanIco>
                <hr />
              </SpanIco>
            ) : null}
          </div>
          <button
            onClick={handleShare}
            type='button'
            id={"comentario" + Number(props.idPublicacion)}
            className='border-none flex items-center gap-2 text-[0.8rem] p-2 hover:backdrop-contrast-50 rounded-md'
          >
            <FiShare2 className='text-base' size='20' />
            Compartir
          </button>
        </div>
      </DivInteractuar>

      {comentario ? (
        <Comment
          mutate={props.mutate}
          idPublicacion={props.idPublicacion}
          verification={props.vereficationUser}
          comentarios={props.comentarios}
          userName={props?.user.name}
          name={props?.user.name}
          imgUserPro={props.imgUserPro}
          userId={props.userId}
          id={props.id}
          connect={connected.find((e: any) => e.id == props.id)?.connect && true}
        />
      ) : null}
      {isLoadingDeletePubli ? (
        <div
          className={`${
            isLoadingDeletePubli
              ? "absolute inset-0 backdrop-brightness-50	flex justify-center items-center rounded-md"
              : ""
          }`}
        >
          <LoaderRequest />
        </div>
      ) : null}
    </div>
  );
}
