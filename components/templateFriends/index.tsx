'use client';
import dynamic from 'next/dynamic';
import { ButtonAgregar } from '@/ui/boton';
import Link from 'next/link';
import { useState } from 'react';

const LoaderRequest = dynamic(() => import('../loader').then((mod) => mod.LoaderRequest));

const DivAllAmistades = dynamic(() => import('@/ui/container').then((mod) => mod.DivAllAmistades));

export default function TemplateFriendRequest({ id, fullName, img, requestClassDuo, typeRequest }: { id: number; fullName: string; img: string; requestClassDuo: boolean; typeRequest: 'suggestion' | 'requestFriend' | 'allFriend' | 'requestSent' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSolicitudEnv = async (e: any) => {
    setIsLoading(true);
    const id = e.target.id;
    const createSolicitud = await import('@/lib/hook').then((mod) => mod.createSolicitud);
    await createSolicitud({
      amigoId: Number(id),
    });
    setIsLoading(false);
  };
  const handleSolicitudAcep = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);

    const aceptarSolicitud = await import('@/lib/hook').then((mod) => mod.aceptarSolicitud);
    await aceptarSolicitud(Number(id));
    setIsLoading(false);
  };
  const handleSolicitudRecha = async (e: any) => {
    const id = e.target.id;
    setIsLoading(true);
    const rechazarSolicitud = await import('@/lib/hook').then((mod) => mod.rechazarSolicitud);
    await rechazarSolicitud({
      userId: Number(id),
    });
    setIsLoading(false);
  };
  const handleEliminarAmigo = async (e: any) => {
    const id = e.target.id;
    const eliminarAmigo = await import('@/lib/hook').then((mod) => mod.eliminarAmigo);
    await eliminarAmigo(Number(id));
  };
  return (
    <DivAllAmistades requestClassDuo={requestClassDuo}>
      <Link href={'/amigos/' + id} className='h-full hover:opacity-60'>
        <img src={img ? img : '/user.webp'} alt={fullName} className='object-cover w-full h-full' loading='lazy' />
      </Link>
      <div className='p-2 h-full w-[inherit]'>
        <Link href={'/amigos/' + id} className='p-2 font-semibold hover:opacity-60 block whitespace-nowrap	 overflow-hidden text-ellipsis'>
          {fullName}
        </Link>
        {!isLoading ? (
          <>
            {' '}
            {typeRequest == 'suggestion' ? (
              <ButtonAgregar id={id} onClick={handleSolicitudEnv} bg={'blue'}>
                Añadir amigo
              </ButtonAgregar>
            ) : null}
            {typeRequest == 'requestFriend' ? (
              <div className='flex items-center flex-col gap-2'>
                <ButtonAgregar id={id} onClick={handleSolicitudAcep}>
                  Aceptar{' '}
                </ButtonAgregar>
                <ButtonAgregar id={id} onClick={handleSolicitudRecha} bg='red'>
                  Rechazar
                </ButtonAgregar>
              </div>
            ) : null}
            {typeRequest == 'allFriend' ? (
              <ButtonAgregar id={id} onClick={handleEliminarAmigo} bg={'red'}>
                Eliminar amigo
              </ButtonAgregar>
            ) : null}
            {typeRequest == 'requestSent' ? (
              <ButtonAgregar id={id} onClick={handleSolicitudRecha} bg={'red'}>
                Cancelar solicitud
              </ButtonAgregar>
            ) : null}
          </>
        ) : (
          <div className='flex items-center justify-center'>
            <LoaderRequest />
          </div>
        )}
      </div>
    </DivAllAmistades>
  );
}
