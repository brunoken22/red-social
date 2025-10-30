"use client";
import dynamic from "next/dynamic";
import { DivAllPublicaciones } from "@/ui/container";
import { LoaderRequest } from "../loader";
import Link from "next/link";
import { Publication, useUser } from "@/lib/store";

const ThemplatePubli = dynamic(
  () => import("../templatePublicate").then((mod) => mod.ThemplatePubli),
  {
    loading: () => <LoaderRequest />,
  }
);
export default function NotificationId({ notification }: { notification: Publication }) {
  const user = useUser((state) => state.user);
  return (
    <div className='max-w-[600px] w-full'>
      {notification ? (
        <DivAllPublicaciones>
          <ThemplatePubli
            vereficationUser={user?.verification}
            description={notification.description}
            media={notification.media}
            fecha={notification.createdAt}
            like={notification.likePublics}
            comentarios={notification.commentPublis}
            imgUserPro={user.img}
            id={notification.userId}
            idPublicacion={notification.id}
            userId={user.id}
            user={notification.user}
          />
        </DivAllPublicaciones>
      ) : (
        <div className='dark:bg-darkComponet  shadow-lg rounded-2xl p-8 max-w-md'>
          <h1 className='text-2xl font-bold dark:text-primary text-secundary  mb-4'>
            ⚠️ Publicación no encontrada
          </h1>
          <p className='dark:text-primary text-secundary mb-6'>
            Esta publicación no se puede visualizar. Es posible que haya sido eliminada o no exista.
          </p>
          <Link
            href='/notificaciones'
            className='bg-light  text-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition'
          >
            Volver a tus notificaciones
          </Link>
        </div>
      )}
    </div>
  );
}
