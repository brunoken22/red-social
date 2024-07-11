import Link from 'next/link';
export default function Signin() {
  return (
    <div>
      <Link href={'/iniciarSesion'}>Inicio sesion </Link>
      <Link href={'/iniciarSesion'}>Inicio sesion </Link>
      <Link href={'/crearCuenta'}>Crear cuenta </Link>
      <Link href={'/inicio'}>home</Link>
    </div>
  );
}
