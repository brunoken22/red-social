'use client';
// import {cookies} from 'next/headers';
import Link from 'next/link';
export default function Signin() {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token');
  const handleGetCookie = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_PORT + '/');
    const data = await res.json();
    console.log(data);
  };
  const handleDeleteCookie = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_PORT + '/api/log-out', {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <Link href={'/signin'}>Inicio sesion </Link>
      <Link href={'/signin'}>Inicio sesion </Link>
      <Link href={'/signup'}>Crear cuenta </Link>
      <Link href={'/home'}>home</Link>

      <div className='flex flex-col gap-8'>
        <button className='bg-blue-500 p-2' onClick={handleGetCookie}>
          agregar cokkie
        </button>
        <button className='bg-red-500 p-2' onClick={handleDeleteCookie}>
          eliminar cokkie
        </button>
      </div>
    </div>
  );
}
