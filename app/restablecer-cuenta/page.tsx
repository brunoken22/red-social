import { Metadata } from 'next';
import RestablecerCuenta from '@/components/Restablecer-cuenta';

export const metadata: Metadata = {
  title: 'Restablecer contraseña | UniRed',
  description: 'Restablece tu contraseña olvidada',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),

  openGraph: {
    title: 'Restablecer contraseña | UniRed',
    description: 'Restablece tu contraseña olvidada',
    images: '/logo.webp',
    url: 'https://unired.vercel.app/restablecer-cuenta',
    type: 'website',
  },
  twitter: {
    title: 'BuscaRestablecer contraseña | UniRed',
    description: 'Restablece tu contraseña olvidada',
    creator: '@brunoken',
    images: '/logo.webp',
  },
};
export default function ResetPassword() {
  return (
    <div className='w-[90%] m-auto max-w-[500px]'>
      <RestablecerCuenta />
    </div>
  );
}
