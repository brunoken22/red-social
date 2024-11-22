'use client';
import dynamic from 'next/dynamic';
import { DivAllChat } from '@/ui/container';
import { DivTemMensaje, TemplMensaje, TemplChat, SpanNoti } from './styled';
import { useRecoilValue } from 'recoil';
import { user, isMenssage, isConnect, User } from '@/lib/atom';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { LuMessageSquare, LuUsers } from 'react-icons/lu';
import { GetAllUserChat } from '@/lib/hook';
import Link from 'next/link';
import { LoaderRequest } from '../loader';

const TemplateChat = dynamic(() => import('./templateChat'), {
  loading: () => <LoaderRequest />,
});
const Verification = dynamic(() => import('@/ui/verification'), {
  loading: () => <LoaderRequest />,
});
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'), {
  loading: () => <LoaderRequest />,
});
const Loader = dynamic(() => import('../loader').then((mod) => mod.Loader), {
  loading: () => <LoaderRequest />,
});

export type MessageUserChat = {
  rtdb: string | undefined;
  message?: string;
  read?: boolean;
  fullName: string;
  img: string;
  status: 'Enviado' | 'Recibido' | 'Leido';
  id: string;
};

export function TemMensaje() {
  const params = useSearchParams();
  const dataUser = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);
  const dataMessage = useRecoilValue(isMenssage);
  const [dataMensajeUser, setDataMensajeUser] = useState<MessageUserChat>();
  const { data, isLoading } = GetAllUserChat();

  useEffect(() => {
    const rtdbParams = params.get('rtdb') as any;
    const imgParams = params.get('img') as string;
    const fullNameParams = params.get('fullName') as string;
    const idParams = params.get('id') as string;

    if (rtdbParams && idParams && fullNameParams) {
      const miArrayRTDB = rtdbParams.split(',');
      const rtdbId = existenElementosSimilares(miArrayRTDB, dataUser.user.rtdb);

      setDataMensajeUser({
        fullName: fullNameParams,
        img: imgParams,
        id: idParams,
        rtdb: rtdbId,
        status: 'Enviado',
      });
    }
  }, [params.get('fullName')]);

  if (isLoading) return <Loader />;

  return (
    <DivTemMensaje>
      {data?.length && !isLoading ? (
        <>
          <div
            className={`w-1/4  max-md:w-full ${
              !dataMensajeUser?.id ? 'block ' : 'max-md:hidden block'
            } h-[85vh] overflow-auto`}>
            {dataUser.user.id ? (
              <TemplMensaje mobile={true}>
                <h2 className='text-2xl font-bold text-start'>Chats</h2>
                <TemplChat>
                  {!isLoading ? (
                    data.length ? (
                      data.map((e: User) => {
                        const rtdbId = existenElementosSimilares(e.rtdb, dataUser.user.rtdb as []);
                        return (
                          <button
                            type='submit'
                            className={`w-full  rounded-md dark:text-primary ${
                              e.id.toString() === dataMensajeUser?.id
                                ? 'bg-light text-primary'
                                : 'bg-primary dark:bg-darkComponet hover:opacity-70'
                            } dark:transition-dark dark:shadow-dark  shadow-container `}
                            key={e.id}
                            onClick={() => {
                              setDataMensajeUser({
                                fullName: e.fullName,
                                img: e.img,
                                id: e.id.toString(),
                                rtdb: rtdbId as string,
                                status: 'Enviado',
                              });
                            }}>
                            <DivAllChat>
                              <FotoPerfil
                                img={e.img}
                                className='w-[40px] h-[40px]'
                                connect={
                                  dataIsConnect?.find((eConnect: any) => e.id == eConnect.id)
                                    ?.connect && true
                                }
                              />

                              <div className='flex flex-col  overflow-hidden'>
                                <div className='flex gap-2 items-center'>
                                  {' '}
                                  <p className='m-0 text-start truncate '>{e.fullName}</p>
                                  {e.verification && <Verification publication={false} />}
                                </div>

                                <p
                                  className={`text-[0.8rem] text-start truncate ${
                                    !dataMessage?.find((item) => item.id == e.id)?.read &&
                                    dataMessage?.filter((item) => item.id == e.id)?.length
                                      ? 'font-black'
                                      : Number(dataMensajeUser?.id) === e.id
                                      ? 'text-gray-300 dark:text-gray-300'
                                      : 'text-gray-600 dark:text-gray-300'
                                  }`}>
                                  {' '}
                                  {dataMessage?.find((item) => item.rtdb == rtdbId)?.message}
                                </p>
                              </div>
                              {!dataMessage?.find((item) => item.id == e.id)?.read &&
                              dataMessage?.filter((item) => item.id == e.id)?.length ? (
                                <SpanNoti>
                                  {dataMessage?.filter((user: any) => user.id == e.id).length}
                                </SpanNoti>
                              ) : null}
                            </DivAllChat>
                          </button>
                        );
                      })
                    ) : (
                      'Sin Chat'
                    )
                  ) : (
                    <LoaderRequest />
                  )}
                </TemplChat>
              </TemplMensaje>
            ) : null}
          </div>

          <div
            className={`w-3/4  max-md:w-full ${
              !dataMensajeUser?.id ? 'block max-md:hidden' : ' block'
            } h-[80vh]`}>
            {dataMensajeUser?.id ? (
              <TemplateChat
                connect={
                  (dataIsConnect?.find((eConnect: any) => dataMensajeUser.id == eConnect.id)
                    ?.connect &&
                    true) ||
                  false
                }
                dataMensajeUser={dataMensajeUser}
                id={dataUser.user.id}
                close={() =>
                  setDataMensajeUser({
                    rtdb: '',
                    message: '',
                    read: false,
                    fullName: '',
                    img: '',
                    status: 'Enviado',
                    id: '',
                  })
                }
              />
            ) : (
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='text-center p-8 bg-white dark:bg-darkComponet rounded-lg shadow-md max-w-md'>
                  <LuMessageSquare className='w-16 h-16 text-gray-400 dark:text-primary mx-auto mb-4' />
                  <h2 className='text-2xl font-semibold text-gray-800 dark:text-primary mb-2'>
                    No hay chat seleccionado
                  </h2>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Selecciona una conversación de la lista a la izquierda para comenzar a chatear.
                    Aquí podrás ver el historial de mensajes y enviar nuevos mensajes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : !data?.length && isLoading ? (
        <>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-center p-8 bg-white dark:bg-darkComponet rounded-lg shadow-md max-w-md'>
              <LuMessageSquare className='w-16 h-16 text-gray-400 dark:text-primary mx-auto mb-4' />
              <h2 className='text-2xl font-semibold text-gray-800 dark:text-primary mb-2'>
                ¿Aún no tienes conversaciones?
              </h2>
              <p className='text-gray-600 dark:text-gray-300'>
                Agrega amigos para comenzar a chatear y compartir momentos.
              </p>
              <Link
                href='/amigos'
                className='mt-5 inline-flex items-center px-6 py-3 bg-light text-primary font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:opacity-80'>
                <LuUsers className='mr-2' />
                Agregar amigos
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </DivTemMensaje>
  );
}

function existenElementosSimilares(array1: string[], array2: string[]) {
  return array1.find((elemento1) => {
    return array2.find((elemento2) => {
      return elemento1 === elemento2;
    });
  });
}
