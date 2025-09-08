import { Title } from "@/ui/typography";
import LogoPage from "@/ui/logo";
import Link from "next/link";
import { Signup } from "@/components/crearSesion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta | UniRed",
  description: "Únete a UniRed y comienza a conectarte con amig@s y descubrir contenido nuevo.",
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),

  openGraph: {
    title: "Crear cuenta | UniRed",
    description: "Únete a UniRed y comienza a conectarte con amig@s y descubrir contenido nuevo.",
    images: "/icon512_rounded.png",
    url: "https://unired.vercel.app/crearCuenta",
    type: "website",
  },
  twitter: {
    title: "Crear cuenta | UniRed",
    description: "Únete a UniRed y comienza a conectarte con amig@s y descubrir contenido nuevo.",
    creator: "@brunoken",
    images: "/icon512_rounded.png",
  },
};

export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-between'>
      <div className='w-2/4 bg-secundary min-h-screen flex justify-center items-center max-md:hidden'>
        <img src='/signin.svg' alt='signin' className='w-[500px]' />
      </div>
      <div className='w-2/4 p-4 flex flex-col justify-between  max-md:w-full '>
        <Link href={"/"} title='logo' aria-label='logo ' className='w-auto m-auto'>
          <LogoPage />
        </Link>
        <div className='flex flex-col justify-between h-3/4 m-auto max-w-[500px] mt-4 mb-4 w-full'>
          <Title>Crear cuenta</Title>
          <Signup />
          <p className='mt-8'>
            Ya ténes una cuenta?{" "}
            <Link href='/iniciarSesion' className=' font-semibold hover:opacity-70 text-blue-500'>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
