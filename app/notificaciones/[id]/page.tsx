import { DivMain, ContainerMain } from "@/ui/container";
import TemplateNotifiId from "@/components/Notifications/notificationId";
import { Span } from "@/components/span";
import { Metadata } from "next";
import { fetchApiSwr } from "@/lib/api";
import { Publicacion } from "@/lib/atom";

export const metadata: Metadata = {
  title: "Notificaciones | UniRed",
  description: "Notificaciones de usuri@",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
};

export default async function Notificaciones({ params }: { params: { id: string } }) {
  const api = "/user/publicacion/" + params.id;
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const notification: Publicacion = await fetchApiSwr(api, option);
  if (notification.id) {
    const apiViewNotification = `/user/notificaciones/${params.id}`;
    const optionViewNotification = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    await fetchApiSwr(apiViewNotification, optionViewNotification);
  }

  return (
    <DivMain>
      <ContainerMain>
        <TemplateNotifiId notification={notification} />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
