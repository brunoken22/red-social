"use client";
import dynamic from "next/dynamic";
import { DivPublicar } from "@/ui/container";
import { SkeletonNoti } from "@/ui/skeleton";
import { useEffect } from "react";
import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { NotificationPublication, useIsConnected, useNotificationUser, useUser } from "@/lib/store";

const ButtonMasPubli = dynamic(() =>
  import("../publicaciones/styled").then((mod) => mod.ButtonMasPubli)
);

const TemplateNotification = dynamic(() => import("../templateNotification"), {
  loading: () => <SkeletonNoti />,
});

export function Notification() {
  const user = useUser((state) => state.user);
  const connected = useIsConnected((state) => state.connected);

  const notificationUser = useNotificationUser((state) => state.notificationUser);
  const setNotificationUser = useNotificationUser((state) => state.setNotificationUser);

  useEffect(() => {
    if (user.id) {
      const notificationRef = query(
        ref(rtdb, `/notifications/${user.id}`),
        orderByChild("timestamp"),
        limitToLast(notificationUser.limit)
      );
      onValue(notificationRef, (snapshot) => {
        const valor = snapshot.val();

        if (valor) {
          const data: NotificationPublication[] = Object.values(valor);

          setNotificationUser({
            ...notificationUser,
            publications: data.reverse(),
            isLoading: false,
          });
        } else {
          setNotificationUser({
            ...notificationUser,
            isLoading: false,
          });
        }
      });
    }
  }, [user?.id, notificationUser.limit]);

  const handleMasPubli = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setNotificationUser({
      ...notificationUser,
      limit: notificationUser.limit + 10,
    });
  };

  return (
    <DivPublicar className={` !justify-normal w-full mb-2`}>
      {!notificationUser.isLoading
        ? notificationUser.publications.length
          ? notificationUser.publications.map((notification, indx) => (
              <TemplateNotification
                key={notification.id || indx}
                notification={notification}
                connect={
                  connected.length
                    ? connected.find((isConnectUser) => isConnectUser.id == notification.fromUser)
                        ?.connect
                      ? true
                      : false
                    : false
                }
              />
            ))
          : "Sin notificaciones"
        : null}

      {/* {true ? <MaintenanceMessage /> : null} */}

      {notificationUser.isLoading ? <SkeletonNoti className='w-full' /> : null}

      {notificationUser.publications.length === notificationUser.limit ? (
        <div className='backdrop-contrast-50'>
          <ButtonMasPubli onClick={handleMasPubli}>Más</ButtonMasPubli>
        </div>
      ) : null}
    </DivPublicar>
  );
}
