"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaComment, FaHeart, FaReply } from "react-icons/fa";
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));

export default function TemplateNotification({
  notification,
  connect,
}: {
  notification: any;
  connect: boolean;
}) {
  return (
    <Link
      href={`/notificaciones/${notification.publicacionId}`}
      className={`truncate p-2 rounded-md flex justify-start items-center w-full gap-2 hover:opacity-60 ${
        !notification.read ? "bg-hoverPrimary dark:bg-dark " : null
      }`}
    >
      {/* Imagen del usuario que generó la notificación */}
      <FotoPerfil className='w-[40px] h-[40px]' img={notification.img} connect={connect} />

      {/* Mensaje según el tipo de notificación */}
      <p className='flex flex-wrap justify-start items-center text-sm dark:text-gray-400 text-gray-700 leading-tight line-clamp-2 text-wrap w-full  text-start'>
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
            <b className=' mr-2 text-blue-600'>{notification.fullName}</b> le dio{" "}
            <span className=' mx-1 text-red-500'>❤️ Me gusta</span> a tu publicación.
          </>
        )}

        {notification.type === "comment" && (
          <>
            <b className='  mr-2 text-green-600'>{notification.fullName}</b> comentó en tu
            publicación:{" "}
            <i className=' mx-1 text-gray-500 ml-1'>
              {notification.descriptionReduce || "Ver más..."}
            </i>
          </>
        )}

        {notification.type === "reply" && (
          <>
            <b className='  mr-2 text-purple-600'>{notification.fullName}</b> respondió en una
            publicación que sigues:{" "}
            <i className=' mx-1 text-gray-500 ml-1'>
              {notification.descriptionReduce || "Ver más..."}
            </i>
          </>
        )}
      </p>
    </Link>
  );
}
