"use client";
import dynamic from "next/dynamic";
import { DivPublicar } from "@/ui/container";
import { isConnect, notificacionesUser, NotificationPublication, user } from "@/lib/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SkeletonNoti } from "@/ui/skeleton";
import { useEffect } from "react";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase";

const ButtonMasPubli = dynamic(() =>
  import("../publicaciones/styled").then((mod) => mod.ButtonMasPubli)
);

const TemplateNotification = dynamic(() => import("../templateNotification"), {
  loading: () => <SkeletonNoti />,
});

export function Notification() {
  const [notificacionesUserAtom, setNotificacionUserAtom] = useRecoilState(notificacionesUser);
  const dataIsConnect = useRecoilValue(isConnect);
  const dataUser = useRecoilValue(user);

  useEffect(() => {
    if (dataUser.user.id) {
      const notificationRef = query(
        ref(rtdb, `/notifications/${dataUser.user.id}`),
        orderByChild("timestamp"),
        limitToLast(notificacionesUserAtom.limit)
      );
      onValue(notificationRef, (snapshot) => {
        const valor = snapshot.val();

        if (valor) {
          const data: NotificationPublication[] = Object.values(valor);

          setNotificacionUserAtom((prev) => ({
            ...prev,
            limit: notificacionesUserAtom.limit,
            publicacion: data.reverse(),
            isLoading: false,
          }));
        } else {
          setNotificacionUserAtom((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      });
    }
  }, [dataUser?.user?.id, notificacionesUserAtom.limit]);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setNotificacionUserAtom((prevPagePubli) => ({
      ...prevPagePubli,
      limit: prevPagePubli.limit + 10,
    }));
  };

  return (
    <DivPublicar className={` !justify-normal w-full mb-2`}>
      {!notificacionesUserAtom.isLoading
        ? notificacionesUserAtom.publicacion.length
          ? notificacionesUserAtom.publicacion.map((notification, indx) => (
              <TemplateNotification
                key={notification.id || indx}
                notification={notification}
                connect={
                  dataIsConnect.length
                    ? dataIsConnect.find(
                        (isConnectUser) => isConnectUser.id == notification.fromUser
                      )?.connect
                      ? true
                      : false
                    : false
                }
              />
            ))
          : "Sin notificaciones"
        : null}

      {/* {true ? <MaintenanceMessage /> : null} */}

      {notificacionesUserAtom.isLoading ? <SkeletonNoti className='w-full' /> : null}

      {notificacionesUserAtom.publicacion.length === notificacionesUserAtom.limit ? (
        <div className='backdrop-contrast-50'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </DivPublicar>
  );
}
