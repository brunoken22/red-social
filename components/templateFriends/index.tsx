'use client';
import dynamic from 'next/dynamic';
import { ButtonAgregar } from '@/ui/boton';
import Link from 'next/link';
import { useState } from 'react';

const LoaderRequest = dynamic(() => import('../loader').then((mod) => mod.LoaderRequest));

const DivAllAmistades = dynamic(() => import('@/ui/container').then((mod) => mod.DivAllAmistades));

export default function TemplateFriendRequest({
  id,
  fullName,
  img,
  requestClassDuo,
  typeRequest,
}: {
  id: number;
  fullName: string;
  img: string;
  requestClassDuo: boolean;
  typeRequest: 'suggestion' | 'requestFriend' | 'allFriend' | 'requestSent';
}) {
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
      <Link
        href={'/amigos/' + id}
        className='h-full hover:opacity-60 max-md:m-auto max-sm:h-[120px] max-sm:w-[120px]   max-sm:p-2 '>
        <img
          src={img ? img : '/user.webp'}
          alt={fullName}
          className='object-cover w-full h-full  max-sm:rounded-full max-sm:overflow-hidden'
          loading='lazy'
        />
      </Link>
      <div className='p-2 h-full w-[inherit] max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:justify-center max-md:max-w-[320px] max-md:min-w-full'>
        <Link
          href={'/amigos/' + id}
          className='p-2 font-semibold hover:opacity-60 block whitespace-nowrap	max-md:text-start truncate'>
          {fullName}
        </Link>
        <div className='flex flex-col max-sm:flex-row justify-center gap-2'>
          {!isLoading ? (
            <>
              {' '}
              {typeRequest == 'suggestion' ? (
                <ButtonAgregar id={id} onClick={handleSolicitudEnv} bg={'blue'}>
                  Añadir amigo
                </ButtonAgregar>
              ) : null}
              {typeRequest == 'requestFriend' ? (
                <>
                  <ButtonAgregar id={id} onClick={handleSolicitudAcep}>
                    Aceptar{' '}
                  </ButtonAgregar>
                  <ButtonAgregar id={id} onClick={handleSolicitudRecha} bg='red'>
                    Rechazar
                  </ButtonAgregar>
                </>
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
      </div>
    </DivAllAmistades>
  );
}
