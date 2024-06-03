import {Roboto_Slab} from 'next/font/google';
import {Title} from '@/ui/typography';
import LogoPage from '@/ui/logo';
import Link from 'next/link';
import {Signup} from '@/components/crearSesion';

const robotoSlab = Roboto_Slab({weight: '800', subsets: ['latin']});

export default function Home() {
  return (
    <div className='min-h-screen flex items-center justify-between'>
      <div className='w-3/5 bg-secundary min-h-screen flex justify-center items-center max-md:hidden'>
        <img src='/signin.svg' alt='signin' className='w-[500px]' />
      </div>
      <div className='w-2/5 p-4 flex flex-col justify-between h-[60vh] max-md:w-full '>
        <LogoPage />
        <div className='flex flex-col justify-between h-3/4 m-auto max-w-[500px] w-full'>
          <Title classType={robotoSlab.className}>Crear cuenta</Title>
          <Signup />
          <p className='mt-8'>
            Ya ténes una cuenta?{' '}
            <Link href='/signin' className=' font-semibold hover:opacity-70'>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
