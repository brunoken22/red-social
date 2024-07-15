import LogoPage from '@/ui/logo';
import Link from 'next/link';
import {Metadata} from 'next';
import dynamic from 'next/dynamic';
import {Title} from '@/ui/typography';
export const metadata: Metadata = {
  title: 'Inicia sesión | UniRed',
  description: 'Inicia sesión',
};
const Signin = dynamic(() => import('@/components/inicioSesion'), {ssr: false});

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-between'>
      <div className='w-2/4 bg-secundary  min-h-screen flex justify-center items-center max-md:hidden'>
        <img src='/signin.svg' alt='signin' className='w-[500px]' />
      </div>
      <div className='w-2/4 p-4 flex flex-col justify-between  max-md:w-full '>
        <LogoPage />
        <div className='flex flex-col justify-between h-3/4 m-auto max-w-[500px] mt-4 mb-4 w-full'>
          <Title>Inicio Sesion</Title>
          <Signin />
          <p className='mt-8'>
            No ténes cuenta?{' '}
            <Link
              href='/crearCuenta'
              className='font-semibold hover:opacity-70'>
              Registrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
