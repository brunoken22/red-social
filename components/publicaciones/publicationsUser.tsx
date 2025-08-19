import { DivAllPublicaciones } from "@/ui/container";
import { ButtonMasPubli } from "./styled";
import { publicacionUser, user } from "@/lib/atom";
import { useRecoilValue } from "recoil";
import { GetAllPublicacionesUser } from "@/lib/hook";
import { SkeletonPublicacionAll } from "@/ui/skeleton";
import dynamic from "next/dynamic";

const ThemplatePubli = dynamic(
  () => import("../templatePublicate").then((mod) => mod.ThemplatePubli),
  { loading: () => <SkeletonPublicacionAll /> }
);

export function PublicacionesUser() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);

  const { dataPubliAllAmigosSwr, isLoading, loadMore, isReachingEnd, mutatePublicacionesUser } =
    GetAllPublicacionesUser();

  return (
    <div className='flex flex-col gap-4 pb-3'>
      {publicacionesUser ? (
        publicacionesUser.length ? (
          <>
            {publicacionesUser.map((item) => (
              <DivAllPublicaciones key={item.id}>
                <ThemplatePubli
                  mutate={mutatePublicacionesUser}
                  vereficationUser={dataUser.user.verification}
                  description={item.description}
                  media={item.media}
                  fecha={item.createdAt}
                  like={item.likePublics}
                  comentarios={item.commentPublis}
                  imgUserPro={dataUser.user.img}
                  id={item.userId}
                  idPublicacion={item.id}
                  userId={dataUser.user.id}
                  user={item.user}
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
