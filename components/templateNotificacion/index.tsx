"use client";
import dynamic from "next/dynamic";
import { DivPublicar } from "@/ui/container";
import { isConnect, notificacionesUser } from "@/lib/atom";
import { NotificacionesUser } from "@/lib/hook";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { FaComment, FaHeart, FaReply } from "react-icons/fa";

const SkeletonNoti = dynamic(() => import("@/ui/skeleton").then((mod) => mod.SkeletonNoti));
const ButtonMasPubli = dynamic(() =>
  import("../publicaciones/styled").then((mod) => mod.ButtonMasPubli)
);
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));
const Link = dynamic(() => import("next/link"));

export function TemNoti() {
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  const dataIsConnect = useRecoilValue(isConnect);
  const [offset, setOffset] = useState(0);
  const { dataNotiSwr, isLoadingNotiSwr } = NotificacionesUser(offset);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!dataNotiSwr?.length) {
      return;
    }
    setOffset((prevPagePubli) => prevPagePubli + 10);
  };

  return (
    <DivPublicar>
      {notificacionesUserAtom && notificacionesUserAtom.publicacion.length
        ? notificacionesUserAtom.publicacion.map((notification, index) => (
            <Link
              href={`/notificaciones/${notification.publicacionId}`}
              key={index}
              className={`truncate flex justify-start items-center w-full gap-2 ${
                !notification.read ? "bg-hoverPrimary dark:bg-dark hover:opacity-75" : null
              }`}
            >
              {/* Imagen del usuario que generó la notificación */}
              <FotoPerfil
                className='w-[40px] h-[40px]'
                img={notification.img}
                connect={
                  dataIsConnect.length
                    ? dataIsConnect.find(
                        (isConnectUser: any) => isConnectUser.id == notification.fromUser
                      )?.connect
                    : false
                }
              />

              {/* Mensaje según el tipo de notificación */}
              <p className='text-sm dark:text-gray-400 text-gray-700 leading-tight line-clamp-2 text-wrap w-full inline text-start'>
                {notification.type === "like" && (
                  <span className='p-1 bg-red-100 text-red-500 rounded-full  mr-2 float-left'>
                    <FaHeart />
                  </span>
                )}

                {notification.type === "comment" && (
                  <span className='p-1 bg-green-100 text-green-600 rounded-full mr-2 float-left'>
                    <FaComment />
                  </span>
                )}

                {notification.type === "reply" && (
                  <span className='p-1 bg-purple-100 text-purple-600 rounded-full  mr-2 float-left'>
                    <FaReply />
                  </span>
                )}

                {/* Texto de la notificación */}
                {notification.type === "like" && (
                  <>
                    <b className='text-blue-600'>{notification.fullName}</b> le dio{" "}
                    <span className='text-red-500'>❤️ Me gusta</span> a tu publicación.
                  </>
                )}

                {notification.type === "comment" && (
                  <>
                    <b className='text-green-600'>{notification.fullName}</b> comentó en tu
                    publicación:{" "}
                    <i className='text-gray-500 ml-1'>
                      {notification.descriptionReduce || "Ver más..."}
                    </i>
                  </>
                )}

                {notification.type === "reply" && (
                  <>
                    <b className='text-purple-600'>{notification.fullName}</b> respondió en una
                    publicación que sigues:{" "}
                    <i className='text-gray-500 ml-1'>
                      {notification.descriptionReduce || "Ver más..."}
                    </i>
                  </>
                )}
              </p>
            </Link>
          ))
        : "Sin notificaciones"}
      {/* {true ? <MaintenanceMessage /> : null} */}
      {isLoadingNotiSwr ? <SkeletonNoti /> : null}
      {false && dataNotiSwr?.length ? (
        <div className='backdrop-contrast-50'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </DivPublicar>
  );
}
