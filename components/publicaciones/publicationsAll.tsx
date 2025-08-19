"use client";
import dynamic from "next/dynamic";
import { user, publicacionAmigos } from "@/lib/atom";
import { useRecoilValue } from "recoil";
import { GetAllPublicaciones } from "@/lib/hook";
import { SkeletonPublicacionAll } from "@/ui/skeleton";
import { useCallback, useEffect, useRef } from "react";

const ThemplatePubli = dynamic(
  () => import("../templatePublicate").then((mod) => mod.ThemplatePubli),
  { loading: () => <SkeletonPublicacionAll /> }
);

export default function PublicacionesAll() {
  const publicacionesAmigos = useRecoilValue(publicacionAmigos);
  const dataUser = useRecoilValue(user);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  const { dataPubliAllAmigosSwr, isLoadingAllAmigos, setSize, mutate } = GetAllPublicaciones();

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (dataPubliAllAmigosSwr?.[dataPubliAllAmigosSwr.length - 1]?.length === 0) return;
        setSize((prev) => prev + 1);
      }
    },
    [dataPubliAllAmigosSwr, setSize]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    });

    if (loadMoreRef.current) observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [handleObserver]);

  return (
    <div className='flex flex-col gap-4 pb-3'>
      {isLoadingAllAmigos && dataUser.isLoading ? (
        <SkeletonPublicacionAll />
      ) : (
        <>
          {publicacionesAmigos ? (
            publicacionesAmigos.length ? (
              <>
                {publicacionesAmigos.map((item) => (
                  <div
                    key={item.id}
                    className='bg-primary flex flex-col gap-4 rounded-md   max-md:w-auto  dark:bg-darkComponet dark:text-primary '
                  >
                    <ThemplatePubli
                      mutate={mutate}
                      vereficationUser={dataUser.user.verification}
                      description={item.description}
                      media={item.media}
                      fecha={item.createdAt}
                      like={item.likePublics}
                      comentarios={item.commentPublis}
                      id={item.userId}
                      imgUserPro={dataUser?.user?.img}
                      idPublicacion={item.id}
                      userId={dataUser?.user?.id}
                      user={item.user}
                    />
                  </div>
                ))}
                {dataPubliAllAmigosSwr?.[dataPubliAllAmigosSwr.length - 1]?.length > 0 ? (
                  <div ref={loadMoreRef} className='text-center m-4'>
                    <p className='text-gray-400'>Cargando más publicaciones...</p>{" "}
                  </div>
                ) : null}
              </>
            ) : (
              <p className='text-center'>No hay publicaciones</p>
            )
          ) : null}
        </>
      )}
    </div>
  );
}
