'use client';
import dynamic from 'next/dynamic';
import {Body} from '@/ui/typography';
import {
  DivPerfil,
  DivSpan,
  ButtonOpenImage,
  DivImage,
  DivInteractuar,
  BottonLike,
  DivCantidad,
  SpanIco,
  DivAñadirComentar,
  BottonSendComentario,
  DivPefilDelete,
  ContentDelete,
  ButtonDelete,
  ButtonOpenDelete,
  DivUserLikes,
} from '@/components/publicaciones/styled';
import Like from '@/ui/icons/like.svg';
import CloseWhite from '@/ui/icons/closeWhite.svg';
import Comentar from '@/ui/icons/comentar.svg';
import {isConnect} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {DeletePublic} from '@/lib/hook';
import diferenteDate from './diferenteDate';
const iconConLike = {
  height: ' 20px',
  width: ' 20px',
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '2px',
  backgroundColor: '#5a81ff',
};

const Verification = dynamic(() => import('@/ui/verification'));
const NotificationToastStatus = dynamic(() =>
  import('@/ui/toast').then((mod) => mod.NotificationToastStatus)
);
const SendComentPubli = dynamic(() =>
  import('@/ui/icons').then((mod) => mod.SendComentPubli)
);
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

export function ThemplatePubli(props: {
  description?: string;
  vereficationUser: boolean;
  img?: string;
  fecha: string;
  like: any[];
  comentarios: any[];
  id: number;
  imgUserPro?: string;
  idPublicacion: number;
  userId: number;
  user: any;
}) {
  const [like, setLike] = useState<string>();
  const [comentario, setComentario] = useState(
    props.comentarios?.length &&
      props.comentarios.length > 0 &&
      props.comentarios.length < 3
      ? true
      : false
  );
  const [openImage, setOpenImage] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dataIsConnect = useRecoilValue(isConnect);
  const [publiId, setPubliId] = useState<number>(-1);
  const [totalLike, setTotalLike] = useState(props.like?.length || 0);
  const [userLikes, setUserLikes] = useState<boolean>(false);
  const [comentariosPubli, setComentariosPubli] = useState(
    props.comentarios?.length || 0
  );

  const {dataDelete} = DeletePublic(publiId);

  useEffect(() => {
    const isLike =
      props?.like?.length > 0
        ? props.like?.find((e: any) => e.user.id == props.userId)
        : false;
    setLike(!isLike ? 'disLike' : 'like');

    setTotalLike(props.like?.length);
  }, [props.like, props.userId]);

  useEffect(() => {
    if (dataDelete) {
      setPubliId(-1);
      return;
    }
  }, [dataDelete]);
  const handleClickLike = async (e: any) => {
    e.preventDefault();
    const likeODisLike = (await import('@/lib/hook')).likeODisLike;
    await likeODisLike(props.idPublicacion.toString());
  };
  const handleClickOpenComen = (e: any) => {
    e.preventDefault();
    if (!comentario) {
      setComentario(true);
      e.target.style.fill = '#84e981';
      return;
    }
    setComentario(false);
    e.target.style.fill = '#ddd';
  };

  return (
    <div className='w-full '>
      <DivPefilDelete>
        <DivPerfil>
          {props.user?.id !== props.userId ? (
            <Link href={'/amigos/' + props.id + '/' + props.user.fullName}>
              <FotoPerfil
                img={props?.user?.img}
                className='h-[40px] w-[40px]'
                connect={
                  dataIsConnect?.find((e: any) => e.id == props.id)?.connect &&
                  true
                }></FotoPerfil>
            </Link>
          ) : (
            <FotoPerfil
              img={props?.user?.img}
              className='h-[40px] w-[40px]'
              connect={
                dataIsConnect?.find((e: any) => e.id == props.id)?.connect &&
                true
              }></FotoPerfil>
          )}
          <div>
            <div className='flex items-center gap-2'>
              {props.user?.id !== props.userId ? (
                <Link href={'/amigos/' + props.id + '/' + props.user.fullName}>
                  <Body>
                    {props.user?.id == props.userId
                      ? 'Tú'
                      : props.user.fullName}
                  </Body>
                </Link>
              ) : (
                <Body>
                  {props.user?.id == props.userId ? 'Tú' : props.user.fullName}
                </Body>
              )}

              {props.user.verification ? (
                <Verification publication={true} />
              ) : null}
            </div>
            <span className='text-[0.7rem] '>{diferenteDate(props.fecha)}</span>
          </div>
        </DivPerfil>
        {props.id == props.userId ? (
          <div className='relative'>
            <ButtonOpenDelete
              onClick={() => setOpenDelete(!openDelete)}
              aria-label='EliminarContet'>
              <ContentDelete />
              <ContentDelete />
              <ContentDelete />
            </ButtonOpenDelete>
            {openDelete && (
              <ButtonDelete
                aria-label='Eliminar'
                onClick={() => {
                  setPubliId(props.idPublicacion);
                  setOpenDelete(false);
                }}>
                Eliminar
              </ButtonDelete>
            )}
          </div>
        ) : null}
      </DivPefilDelete>
      <p className='p-6 text-[0.9rem] font-thin'>{props.description}</p>
      {props.img ? (
        <ButtonOpenImage onClick={() => setOpenImage(true)}>
          <DivImage>
            <img
              src={props?.img}
              alt='imagen user'
              loading='lazy'
              height={300}
              width={500}
              className='object-cover  w-full h-full hover:scale-[1.1]  transition-all '
            />
          </DivImage>
        </ButtonOpenImage>
      ) : null}
      <DivCantidad>
        {totalLike ? (
          <SpanIco
            onMouseEnter={() => setUserLikes(true)}
            onMouseLeave={() => {
              setUserLikes(false);
            }}>
            {userLikes ? (
              <DivUserLikes>
                {props.like.map((e: any) => (
                  <div
                    key={e.id}
                    className='w-full whitespace-nowrap	 overflow-hidden text-ellipsis m-0'>
                    {e.user.id !== props.userId ? e.user.fullName : 'Tú'}
                  </div>
                ))}
              </DivUserLikes>
            ) : null}

            <Like className={`fill-[#fff]`} style={iconConLike} />
            {totalLike}
          </SpanIco>
        ) : (
          <div></div>
        )}
        {comentariosPubli > 0 ? (
          <SpanIco>
            <DivSpan>Comentarios {comentariosPubli} </DivSpan>
          </SpanIco>
        ) : (
          <div></div>
        )}
      </DivCantidad>
      <DivInteractuar>
        <BottonLike
          type='button'
          onClick={handleClickLike}
          like={like == 'like' ? true : false}
          id={props.idPublicacion.toString()}>
          <Like
            className={`${
              like == 'like'
                ? 'fill-[#5a81ff]'
                : 'dark:fill-[#ddd] fill-[#919191]'
            }`}
          />
          Me gusta
        </BottonLike>
        <BottonLike
          onClick={handleClickOpenComen}
          type='button'
          id={'comentario' + Number(props.idPublicacion)}>
          <Comentar
            className={`${
              comentario ? 'fill-[#84e981]' : 'dark:fill-[#ddd] fill-[#919191]'
            }`}
          />
          Comentar
        </BottonLike>
      </DivInteractuar>
      {comentario ? (
        <ComentarioPublic
          idPublicacion={props.idPublicacion}
          verification={props.vereficationUser}
          comentarios={props.comentarios}
          userName={props?.user.name}
          name={props?.user.name}
          imgUserPro={props.imgUserPro}
          userId={props.userId}
          id={props.id}
          connect={
            dataIsConnect?.find((e: any) => e.id == props.id)?.connect && true
          }
          publicComentario={(isComentario: boolean) =>
            isComentario && setComentariosPubli((prev: number) => prev + 1)
          }
        />
      ) : null}
      {openImage ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10,
            backdropFilter: 'brightness(0.3)',
          }}>
          <div className='flex justify-end'>
            <button
              onClick={() => setOpenImage(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}>
              <CloseWhite />
            </button>
          </div>
          <img
            src={props?.img}
            alt='imagen'
            className='w-full h-full object-contain'
          />
        </div>
      ) : null}
    </div>
  );
}

function ComentarioPublic(props: any) {
  const [content, setContent] = useState('');
  const [dataComentariosAll, setDataComentariosAll] = useState<any[]>(
    props.comentarios
  );
  const [alert, setAlert] = useState<
    {message: string; status: 'success' | 'error' | 'info' | 'warning'} | false
  >(false);
  const handleInput = (event: any) => {
    const text = event.target.textContent;
    if (text.length <= 250) {
      setContent(text);
    }
    if (text.length >= 250) {
      event.target.textContent = content;
    }
  };
  const handleComment = async () => {
    if (content) {
      const comentarPublicacion = (await import('@/lib/hook'))
        .comentarPublicacion;

      await comentarPublicacion({
        id: props.idPublicacion,
        description: content,
      });
      setContent('');
      setDataComentariosAll((prev: any) => [
        ...prev,
        {
          id: Math.random() * (1000 - 100) + 100,
          description: content,
          user: {
            id: props.userId,
            img: props.imgUserPro,
            fullName: props.userName,
            verification: props.verification,
          },
        },
      ]);
      props.publicComentario(true);
      return;
    }
    setAlert({message: 'Escribe Algo', status: 'error'});
  };
  return (
    <div className='p-4 mt-0 max-md:p-2 max-md:pt-0'>
      <div className='mt-2 mb-2'>
        <DivPerfil className='items-center'>
          <FotoPerfil
            className='h-[30px] w-[30px]'
            img={props.imgUserPro}
            connect={props.connect}></FotoPerfil>
          <DivAñadirComentar>
            <div className='min-w-[200px] max-w-full '>
              <p
                onInput={handleInput}
                suppressContentEditableWarning={true}
                contentEditable={true}
                className={`outline-none w-full p-2 border-[1px] dark:border-[#ddd] border-[#616161] rounded-md dark:focus:bg-[#363636] focus:border-white focus:bg-[#ddd] text-secundary dark:text-primary ${
                  !content
                    ? 'before:text-secundary dark:before:text-primary  before:content-["Añadir_un_comentario"]'
                    : ''
                } `}>
                {!content ? '' : null}
              </p>
            </div>
            <BottonSendComentario onClick={handleComment}>
              <SendComentPubli />
            </BottonSendComentario>
          </DivAñadirComentar>
        </DivPerfil>
      </div>
      <div>
        {dataComentariosAll?.length > 0
          ? dataComentariosAll.map((e) => {
              return (
                <TemplateComentario
                  key={e.id}
                  userId={e.user.id}
                  imgUser={e.user.img}
                  userName={e.user.id == props.userId ? 'Tú' : e.user.fullName}
                  description={e.description}
                  createdAt={e.createdAt}
                  verification={e.user.verification}
                />
              );
            })
          : null}
      </div>
      {alert && (
        <NotificationToastStatus
          message={alert.message}
          status={alert.status}
          close={() => setAlert(false)}
        />
      )}
    </div>
  );
}

function TemplateComentario(props: {
  userId: number;
  imgUser: string;
  userName: string;
  description: string;
  verification: boolean;
  createdAt: string;
}) {
  return (
    <div className='m-4'>
      <DivPerfil>
        {props.userName !== 'Tú' ? (
          <Link href={'/amigos/' + props.userId + '/' + props.userName}>
            <FotoPerfil
              className='h-[30px] w-[30px]'
              img={props.imgUser}></FotoPerfil>
          </Link>
        ) : (
          <FotoPerfil
            className='h-[30px] w-[30px]'
            img={props.imgUser}></FotoPerfil>
        )}

        <div className='w-[95%]'>
          <div className=' p-2 bg-[#ddddddb0] rounded-[0px_0.5rem_0.5rem] dark:bg-dark'>
            {props.userName !== 'Tú' ? (
              <div className='flex items-center gap-2'>
                <Link
                  href={'/amigos/' + props.userId + '/' + props.userName}
                  className='font-medium m-0 max-w-[250px]  opacity-80 whitespace-nowrap overflow-hidden text-ellipsis '>
                  {props.userName}
                </Link>
                {props.verification ? (
                  <Verification publication={true} />
                ) : null}
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <p className='font-medium m-0 opacity-80'>{props.userName}</p>
                {props.verification ? (
                  <Verification publication={true} />
                ) : null}
              </div>
            )}
            <p className='text-[0.9rem] m-0 break-words'>{props.description}</p>
          </div>
          <span className='text-[0.7rem] pl-2'>
            {diferenteDate(props.createdAt)}
          </span>
        </div>
      </DivPerfil>
    </div>
  );
}
