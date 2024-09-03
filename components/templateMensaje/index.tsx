'use client';
import dynamic from 'next/dynamic';
import {DivAllChat} from '@/ui/container';
import {DivTemMensaje, TemplMensaje, TemplChat, SpanNoti} from './styled';
import {useRecoilValue} from 'recoil';
import {user, isMenssage, isConnect, getAllAmigos} from '@/lib/atom';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';

const TemplateChat = dynamic(() => import('./templateChat'));
const Verification = dynamic(() => import('@/ui/verification'));
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

type MessageUserChat = {
  rtdb: string | undefined;
  message?: string;
  read?: boolean;
  fullName: string;
  img: string;
  id: string;
};

export function TemMensaje() {
  const params = useSearchParams();
  const dataUser = useRecoilValue(user);
  const dataFriendAll = useRecoilValue(getAllAmigos);
  const dataIsConnect = useRecoilValue(isConnect);
  const dataMessage = useRecoilValue(isMenssage);
  const [dataMensajeUser, setDataMensajeUser] = useState<
    MessageUserChat | false
  >(false);

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
      });
    }
  }, [params.get('fullName')]);

  return (
    <DivTemMensaje>
      {dataUser.user.id ? (
        <TemplMensaje mobile={!dataMensajeUser}>
          <h2 className='text-2xl font-bold text-center'>Chats</h2>
          <TemplChat>
            {dataFriendAll.length
              ? dataFriendAll.map((e) => {
                  return (
                    <button
                      type='submit'
                      className='w-full  rounded-md hover:opacity-70 '
                      key={e.id}
                      onClick={() => {
                        const rtdbId = existenElementosSimilares(
                          e.rtdb,
                          dataUser.user.rtdb as []
                        );
                        setDataMensajeUser({
                          fullName: e.fullName,
                          img: e.img,
                          id: e.id.toString(),
                          rtdb: rtdbId as string,
                        });
                      }}>
                      <DivAllChat>
                        <FotoPerfil
                          img={e.img}
                          className='w-[40px] h-[40px]'
                          connect={
                            dataIsConnect?.find(
                              (eConnect: any) => e.id == eConnect.id
                            )?.connect && true
                          }
                        />

                        <div className='flex gap-2 items-center overflow-hidden'>
                          <p className='m-0 text-start truncate'>
                            {e.fullName}
                          </p>
                          {e.verification && (
                            <Verification publication={false} />
                          )}
                        </div>
                        {dataMessage?.find((item: any) => item.id == e.id) && (
                          <SpanNoti>
                            {
                              dataMessage?.filter(
                                (user: any) => user.id == e.id
                              ).length
                            }
                          </SpanNoti>
                        )}
                      </DivAllChat>
                    </button>
                  );
                })
              : 'Sin Chat'}
          </TemplChat>
        </TemplMensaje>
      ) : null}

      {dataMensajeUser ? (
        <TemplateChat
          connect={
            (dataIsConnect?.find(
              (eConnect: any) => dataMensajeUser.id == eConnect.id
            )?.connect &&
              true) ||
            false
          }
          dataMensajeUser={dataMensajeUser}
          id={dataUser.user.id}
          close={() => setDataMensajeUser(false)}
        />
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
