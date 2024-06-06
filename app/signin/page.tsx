import {Roboto_Slab} from 'next/font/google';
import {Signin} from '@/components/inicioSesion';
import {Title} from '@/ui/typography';
import LogoPage from '@/ui/logo';
import Link from 'next/link';

const robotoSlab = Roboto_Slab({weight: '800', subsets: ['latin']});

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-between'>
      <div className='w-3/5 bg-secundary  min-h-screen flex justify-center items-center max-md:hidden'>
        <img src='/signin.svg' alt='signin' className='w-[500px]' />
      </div>
      <div className='w-2/5 p-4 flex flex-col justify-between h-[60vh] max-md:w-full '>
        <LogoPage />
        <div className='flex flex-col justify-between h-3/4 m-auto max-w-[500px] w-full'>
          <Title classType={robotoSlab.className}>Inicio Sesion</Title>
          <Signin />
          <p className='mt-8'>
            No ténes cuenta?{' '}
            <Link href='/signup' className='font-semibold hover:opacity-70'>
              Registrate
            </Link>
          </p>
          <Link href={'/home'}>Home</Link>
        </div>
      </div>
    </div>
  );
}
