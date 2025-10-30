import { DivAllPublicaciones } from "@/ui/container";
import { ButtonMasPubli } from "./styled";
import { GetAllPublicacionesUser } from "@/lib/hook";
import { SkeletonPublicacionAll } from "@/ui/skeleton";
import dynamic from "next/dynamic";
import { usePublicationUser, User } from "@/lib/store";

const ThemplatePubli = dynamic(
  () => import("../templatePublicate").then((mod) => mod.ThemplatePubli),
  { loading: () => <SkeletonPublicacionAll /> }
);

export function PublicacionesUser({ user }: { user: User }) {
  const publications = usePublicationUser((state) => state.publications);

  const { isLoading, loadMore, isReachingEnd, mutatePublicacionesUser } = GetAllPublicacionesUser();

  return (
    <div className='flex flex-col gap-4 pb-3'>
      {publications ? (
        publications.length ? (
          <>
            {publications.map((item) => (
              <DivAllPublicaciones key={item.id}>
                <ThemplatePubli
                  mutate={mutatePublicacionesUser}
                  vereficationUser={user.verification}
                  description={item.description}
                  media={item.media}
                  fecha={item.createdAt}
                  like={item.likePublics}
                  comentarios={item.commentPublis}
                  imgUserPro={user.img}
                  id={item.userId}
                  idPublicacion={item.id}
                  userId={user.id}
                  user={{ ...item.user, img: user.img }}
                />
              </DivAllPublicaciones>
            ))}
            {!isLoading && !isReachingEnd ? (
              <div className='text-center'>
                <ButtonMasPubli onClick={loadMore}>Ver más</ButtonMasPubli>
              </div>
            ) : null}
          </>
        ) : (
          <p className='text-center'>No hay publicaciones</p>
        )
      ) : null}

      {isLoading && <SkeletonPublicacionAll />}
    </div>
  );
}
