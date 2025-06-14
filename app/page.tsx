import Link from 'next/link';
import Logo from '@/public/logo.svg';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bienvenid@ a UniRed',
  description: 'Conéctate con amigos y descubre nuevas personas en nuestra red social(UniRed)',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),

  openGraph: {
    title: 'Bienvenid@ a UniRed',
    description: 'Conéctate con amigos y descubre nuevas personas en nuestra red social(UniRed)',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/',
    type: 'website',
  },
  twitter: {
    title: 'Bienvenid@ a UniRed',
    description: 'Conéctate con amigos y descubre nuevas personas en nuestra red social(UniRed)',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};

export default async function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-primary dark:bg-darkComponet dark:text-white text-secondary p-4 '>
        <div className='container mx-auto flex justify-between items-center '>
          <Link href={'/'} title='logo unired'>
            <Logo className='rounded-md fill-unired transition-dark' />
          </Link>
          <nav>
            <ul className='flex space-x-4 flex-wrap'>
              <li>
                <Link
                  href='/iniciarSesion'
                  className='max-md:text-sm cursor-pointer transition-all bg-light text-white px-4 py-2 rounded-lg border-light border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-light shadow-light active:shadow-none '>
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link
                  href='/contacto'
                  className='max-md:text-sm  max-md-0 cursor-pointer transition-all bg-darkComponetLight text-white px-4 py-2 rounded-lg border-light border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-light shadow-light active:shadow-none '>
                  Contáctame
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className='flex flex-1 flex-col items-center justify-center py-12'>
        <section className='text-center max-w-4xl mx-auto px-4'>
          <h2 className='text-4xl font-bold mb-4'>
            Conéctate con tus amigos y descubre nuevas personas
          </h2>
          <p className='text-lg mb-6'>
            Únete a nuestra red social y comienza a compartir tus momentos con el mundo.
          </p>
          <Link
            href='/crearCuenta'
            className='cursor-pointer transition-all bg-darkComponetLight text-white px-6 py-2 rounded-lg border-light border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-light shadow-light active:shadow-none'>
            Regístrate Ahora
          </Link>
        </section>

        <section className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4'>
          <div className='bg-primary dark:bg-darkComponet p-6 rounded-lg shadow-lg text-center'>
            <h3 className='text-2xl font-bold mb-2'>Comparte</h3>
            <p>Publica tus fotos y pensamientos con tus amigos.</p>
          </div>
          <div className='bg-primary dark:bg-darkComponet p-6 rounded-lg shadow-lg text-center'>
            <h3 className='text-2xl font-bold mb-2'>Descubre</h3>
            <p>Encuentra nuevas personas y conéctate con intereses similares.</p>
          </div>
          <div className='bg-primary dark:bg-darkComponet p-6 rounded-lg shadow-lg text-center'>
            <h3 className='text-2xl font-bold mb-2'>Interactúa</h3>
            <p>Comenta y da me gusta a las publicaciones de otros.</p>
          </div>
        </section>

        <section className='mt-12 text-center max-w-4xl mx-auto px-4'>
          <h3 className='text-2xl font-bold mb-2'>Proyecto Personal</h3>
          <p className='text-lg'>
            Este es un proyecto personal que construí tanto en el backend como en el frontend.
            ¡Espero que lo disfrutes!
          </p>
        </section>
      </main>

      <footer className='bg-primary dark:bg-darkComponet dark:text-white text-secondary text-center p-4'>
        <p className='flex items-center justify-center max-md:flex-col'>
          &copy; 2025 UniRed. Todos los derechos reservados. Hecho por Bruno Ken.
          <Link
            href='https://brunoken.vercel.app/'
            target='_blank'
            className='flex items-center ml-2'>
            <img
              src='/logoByMe.svg'
              alt='bruno ken'
              loading='lazy'
              width={35}
              height={35}
              className='ml-2'
            />
          </Link>
        </p>
      </footer>
    </div>
  );
}
