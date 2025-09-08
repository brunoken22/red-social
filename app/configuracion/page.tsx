import { Span } from "@/components/span";
import { ContainerMain, DivMain } from "@/ui/container";
import { Metadata } from "next";
import { ConfigPerfil } from "@/components/configuracionPerfil";
export const metadata: Metadata = {
  title: "Configuración | UniRed",
  description: "Administra tu cuenta, privacidad y preferencias en UniRed.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Configuración | UniRed",
    description: "Administra tu cuenta, privacidad y preferencias en UniRed.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/configuracion",
    type: "website",
  },
  twitter: {
    title: "Configuración | UniRed",
    description: "Administra tu cuenta, privacidad y preferencias en UniRed.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default function Configuracion() {
  return (
    <DivMain>
      <ContainerMain>
        <ConfigPerfil />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
