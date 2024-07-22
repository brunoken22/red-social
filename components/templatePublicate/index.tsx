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
import {useDebouncedCallback} from 'use-debounce';
const iconConLike = {
  height: ' 20px',
  width: ' 20px',
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '2px',
  backgroundColor: '#5a81ff',
};

const Verification = dynamic(() => import('@/ui/verification'));
const Comment = dynamic(() => import('./comment'));
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
  const [like, setLike] = useState<'like' | 'disLike'>();
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
  const debounced = useDebouncedCallback(async () => {
    const likeODisLike = (await import('@/lib/hook')).likeODisLike;
    await likeODisLike(props.idPublicacion.toString());
  }, 500);
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
    if (like == 'like') {
      setLike('disLike');
      setTotalLike(totalLike - 1);
    } else {
      setTotalLike(totalLike + 1);
      setLike('like');
    }
    await debounced();
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
        <Comment
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
