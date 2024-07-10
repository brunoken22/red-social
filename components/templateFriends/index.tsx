'use client';
import {ButtonAgregar} from '@/ui/boton';
import {DivAllAmistades} from '@/ui/container';
import Link from 'next/link';

export default function TemplateFriendRequest({
  id,
  fullName,
  img,
  handleSolicitudEnv,
  handleSolicitudRecha,
  handleSolicitudAcep,
  handleEliminarAmigo,
  requestClassDuo,
  typeRequest,
}: {
  id: number;
  fullName: string;
  img: string;
  handleSolicitudEnv?: (e: any) => any;
  handleSolicitudAcep?: (e: any) => any;
  handleSolicitudRecha?: (e: any) => any;
  handleEliminarAmigo?: (e: any) => any;

  requestClassDuo: boolean;
  typeRequest: 'suggestion' | 'requestFriend' | 'allFriend' | 'requestSent';
}) {
  return (
    <DivAllAmistades requestClassDuo={requestClassDuo}>
      <Link
        href={'/amigos/' + id + '/' + fullName}
        className='h-full hover:opacity-60'>
        <img
          src={img ? img : '/user.webp'}
          alt={fullName}
          className='object-cover w-full h-full'
          loading='lazy'
        />
      </Link>
      <div className='p-2 h-full w-[inherit]'>
        <Link
          href={'/amigos/' + id + '/' + fullName}
          className='p-2 font-semibold hover:opacity-60 block text-nowrap overflow-hidden text-ellipsis'>
          {fullName}
        </Link>
        {typeRequest == 'suggestion' && handleSolicitudEnv ? (
          <ButtonAgregar id={id} onClick={handleSolicitudEnv} bg={'blue'}>
            Añadir amigo
          </ButtonAgregar>
        ) : null}
        {typeRequest == 'requestFriend' &&
        handleSolicitudRecha &&
        handleSolicitudAcep ? (
          <div className='flex items-center flex-col gap-2'>
            <ButtonAgregar id={id} onClick={handleSolicitudAcep}>
              Aceptar{' '}
            </ButtonAgregar>
            <ButtonAgregar id={id} onClick={handleSolicitudRecha} bg='red'>
              Rechazar
            </ButtonAgregar>
          </div>
        ) : null}
        {typeRequest == 'allFriend' && handleEliminarAmigo ? (
          <ButtonAgregar id={id} onClick={handleEliminarAmigo} bg={'red'}>
            Eliminar amigo
          </ButtonAgregar>
        ) : null}
        {typeRequest == 'requestSent' && handleSolicitudRecha ? (
          <ButtonAgregar id={id} onClick={handleSolicitudRecha} bg={'red'}>
            Cancelar solicitud
          </ButtonAgregar>
        ) : null}
      </div>
    </DivAllAmistades>
  );
}
