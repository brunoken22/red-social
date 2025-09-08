import { DivPublicaciones } from "@/ui/container";
import { Span } from "@/components/span";
import { Metadata } from "next";
import Publicar from "@/components/publicar";
import PublicacionesAll from "@/components/publicaciones/publicationsAll";

export const metadata: Metadata = {
  title: "Inicio | UniRed",
  description: "Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Inicio | UniRed",
    description: "Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/inicio",
    type: "website",
  },
  twitter: {
    title: "Inicio | UniRed",
    description: "Explora las publicaciones de tus amig@s y descubre contenido nuevo en UniRed.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};
export default function Home() {
  return (
    <main>
      <div className=' flex justify-center w-full gap-6 '>
        <DivPublicaciones>
          <Publicar />
          <PublicacionesAll />
        </DivPublicaciones>
        <Span />
      </div>
    </main>
  );
}
