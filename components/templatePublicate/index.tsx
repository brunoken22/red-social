'use client';
import FotoPerfil from '@/ui/FotoPerfil';
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
import {LikeODisLike, comentarPublicacion, DeletePublic} from '@/lib/hook';
import {SendComentPubli} from '@/ui/icons';
// import {InputP} from '../publicar/styled';
import moment from 'moment';
const iconConLike = {
  height: ' 20px',
  width: ' 20px',
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '2px',
  backgroundColor: '#5a81ff',
};

export function ThemplatePubli(props: {
  description?: string;
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

    await LikeODisLike({
      id: props.idPublicacion,
    });

    if (like == 'like') {
      setLike('disLike');
      setTotalLike((prev: number) => prev - 1);
      return;
    }
    if (like == 'disLike') {
      setLike('like');
      setTotalLike((prev: number) => prev + 1);
    }
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
      <DivPefilDelete aria-label='DivPefilDelete'>
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
            <Body classType='m-0 font-bold text-base'>
              {props.user?.id == props.userId ? 'Tú' : props.user.fullName}
            </Body>
            <DivSpan>{diferenteDate(props.fecha)}</DivSpan>
          </div>
        </DivPerfil>
        {props.id == props.userId ? (
          <div style={{position: 'relative'}} aria-label='Eliminar'>
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
      <div
        style={{
          padding: '1rem',
          fontSize: '0.9rem',
          fontWeight: '100',
          overflowWrap: 'anywhere',
        }}>
        <p>{props.description}</p>
      </div>
      {props.img ? (
        <ButtonOpenImage onClick={() => setOpenImage(true)}>
          <DivImage>
            <img
              src={props?.img}
              alt='iamgen user'
              loading='lazy'
              height={300}
              width={500}
              className='object-cover rounded-xl w-full h-full hover:scale-[1.1]  transition-all '
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
                  <div key={e.id}>
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
          id={props.idPublicacion.toString()}>
          <Like
            className={`${like == 'like' ? 'fill-[#5a81ff]' : 'fill-[#ddd]'}`}
          />
          Me gusta
        </BottonLike>
        <BottonLike
          onClick={handleClickOpenComen}
          type='button'
          id={'comentario' + Number(props.idPublicacion)}>
          <Comentar
            className={`${comentario ? 'fill-[#84e981]' : 'fill-[#ddd]'}`}
          />
          Comentar
        </BottonLike>
      </DivInteractuar>
      {comentario ? (
        <ComentarioPublic
          idPublicacion={props.idPublicacion}
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
          <div style={{display: 'flex', justifyContent: 'end'}}>
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
            style={{width: '100%', height: '100%', objectFit: 'contain'}}
          />
        </div>
      ) : null}
    </div>
  );
}

function ComentarioPublic(props: any) {
  const [placeInput, setPlaceinput] = useState(true);
  const [content, setContent] = useState('');
  const [dataComment, setDataComment] = useState(true);
  const [dataComentariosAll, setDataComentariosAll] = useState<any[]>(
    props.comentarios
  );

  useEffect(() => {
    if (content.length <= 0) {
      setPlaceinput(true);
    }
  }, [content]);
  useEffect(() => {
    if (!dataComment) {
      setDataComment(false);
    }
  }, [dataComment]);

  const handleInput = (event: any) => {
    const text = event.target.textContent;
    setPlaceinput(false);
    if (text.length <= 250) {
      setContent(text);
    }
    if (text.length >= 250) {
      event.target.textContent = content;
    }
  };
  const handleComment = async () => {
    if (content) {
      await comentarPublicacion({
        id: props.idPublicacion,
        description: content,
      });
      setDataComment(true);
      setDataComentariosAll((prev: any) => [
        ...prev,
        {
          id: Math.random() * (1000 - 100) + 100,
          description: content,
          user: {
            id: props.userId,
            img: props.imgUserPro,
            fullName: props.userName,
          },
        },
      ]);
      props.publicComentario(true);
      return;
    }
    alert('Escribe Algo');
  };
  return (
    <div>
      <div
        style={{
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
        }}>
        <DivPerfil className='items-center'>
          <FotoPerfil
            className='h-[30px] w-[30px]'
            img={props.imgUserPro}
            connect={props.connect}></FotoPerfil>
          <DivAñadirComentar>
            <div className='min-w-[200px] max-w-full '>
              <p
                onBlur={() => setDataComment(true)}
                onFocus={() => setDataComment(false)}
                onInput={handleInput}
                suppressContentEditableWarning={true}
                contentEditable={true}
                className={`outline-none w-full p-2 border-[1px] border-[#ddd] rounded-md dark:focus:bg-[#363636] focus:border-white focus:bg-[#ddd] text-secundary dark:text-primary ${
                  placeInput ? 'before:text-[#696969]' : ''
                } placeholder:text-red-600`}>
                {dataComment ? 'Añadir un comentario' : null}
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
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

function TemplateComentario(props: {
  userId: number;
  imgUser: string;
  userName: string;
  description: string;
  createdAt: string;
}) {
  return (
    <div style={{margin: '1rem'}}>
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
              <Link
                href={'/amigos/' + props.userId + '/' + props.userName}
                className='font-medium m-0'>
                {props.userName}
              </Link>
            ) : (
              <p className='font-medium m-0'>{props.userName}</p>
            )}
            <p className='text-[0.9rem] m-0 '>{props.description}</p>
          </div>
          <span className='text-[0.7rem] pl-2'>
            {diferenteDate(props.createdAt)}
          </span>
        </div>
      </DivPerfil>
    </div>
  );
}

function diferenteDate(date: string) {
  const targetDate = moment(date);
  const currentDate = moment();
  const differenceInMilliseconds = Math.abs(targetDate.diff(currentDate));

  const yearsDifference = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );
  const monthsDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 365)) /
      (1000 * 60 * 60 * 24 * 30)
  );
  const weeksDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 30)) /
      (1000 * 60 * 60 * 24 * 7)
  );
  const daysDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24 * 7)) /
      (1000 * 60 * 60 * 24)
  );
  const hoursDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const secondsDifference = Math.floor(
    (differenceInMilliseconds % (1000 * 60)) / 1000
  );

  if (yearsDifference) return 'Hace ' + yearsDifference + ' años';
  if (monthsDifference) return 'Hace ' + monthsDifference + ' meses';
  if (weeksDifference) return 'Hace ' + weeksDifference + ' sem';
  if (daysDifference) return 'Hace ' + daysDifference + ' d';
  if (hoursDifference) return 'Hace ' + hoursDifference + ' h';
  if (minutesDifference) return 'Hace ' + minutesDifference + ' min';
  return 'Hace ' + secondsDifference + ' s';
}
