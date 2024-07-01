import Link from 'next/link';
export default function Signin() {
  return (
    <div>
      <Link href={'/signin'}>Inicio sesion </Link>
      <Link href={'/signin'}>Inicio sesion </Link>
      <Link href={'/signup'}>Crear cuenta </Link>
      <Link href={'/home'}>home</Link>
    </div>
  );
}
