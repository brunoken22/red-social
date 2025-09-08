import { Span } from "@/components/span";
import { ContainerMain, DivMain } from "@/ui/container";
import AmigosComponent from "@/components/friendRequest";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Amigos | UniRed",
  description: "Encuentra y conecta con nuevos amig@s en UniRed.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Amigos | UniRed",
    description: "Encuentra y conecta con nuevos amig@s en UniRed.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/amigos",
    type: "website",
  },
  twitter: {
    title: "Amigos | UniRed",
    description: "Encuentra y conecta con nuevos amig@s en UniRed.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default function Amigos() {
  return (
    <div className='p-2 pt-6'>
      <DivMain>
        <ContainerMain>
          <AmigosComponent />
          <Span />
        </ContainerMain>
      </DivMain>
    </div>
  );
}
