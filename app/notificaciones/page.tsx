import { DivMain, ContainerMain } from "@/ui/container";
import { Span } from "@/components/span";
import { Metadata } from "next";
import { Notification } from "@/components/Notifications";
export const metadata: Metadata = {
  title: "Notificaciones | UniRed",
  description:
    "Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Notificaciones | UniRed",
    description:
      "Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/notificaciones",
    type: "website",
  },
  twitter: {
    title: "Notificaciones | UniRed",
    description:
      "Consulta tus notificaciones en UniRed y mantente al día con las actividades de tus amig@s.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default function Notificaciones() {
  return (
    <DivMain>
      <ContainerMain>
        <Notification />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
