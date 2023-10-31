'use client';
import {DivAllPublicaciones} from '@/ui/container';
import {FotoPerfil} from '@/ui/FotoPerfil';
import Image from 'next/image';
import {Body} from '@/ui/typography';
import {
  DivPerfil,
  DivSpan,
  DivImage,
  DivInteractuar,
  BottonLike,
  BottonComentar,
  DivCantidad,
  SpanIco,
  ComentarioParrafo,
  DivAñadirComentar,
  BottonSendComentario,
} from './styled';
import Like from '@/ui/icons/like.svg';
import Comentar from '@/ui/icons/comentar.svg';
import {
  publicacionUser,
  user,
  publicacionAmigos,
  getAllAmigos,
  isConnect,
  Publicacion,
} from '@/lib/atom';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {
  LikeODisLike,
  ComentarPublicacion,
  GetAllPublicaciones,
  GetAllPublicacionesUser,
} from '@/lib/hook';
import {SendComentPubli} from '@/ui/icons';
import {Loader} from '../loader';

const iconConLike = {
  height: ' 10px',
  width: ' 10px',
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '2px',
  backgroundColor: '#5a81ff',
};

export function PublicacionesAll() {
  const publicacionesAmigos = useRecoilValue(publicacionAmigos);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);

  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {dataPubliAllAmigosSwr, isLoadingAllAmigos} = GetAllPublicaciones(
    token,
    pagePubli
  );

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      if (
        scrollPosition + windowHeight >= documentHeight &&
        dataPubliAllAmigosSwr?.length !== 0
      ) {
        setPagePubli((prevPagePubli) => prevPagePubli + 10);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dataPubliAllAmigosSwr]);
  return (
    <div>
      {publicacionesAmigos?.length > 0 ? (
        <>
          {publicacionesAmigos.map((item: Publicacion) => (
            <DivAllPublicaciones key={item?.id}>
              <ThemplatePubli
                name={dataUser?.user?.fullName}
                description={item.description}
                img={item.img}
                fecha={item.fecha}
                like={item.like}
                comentarios={item.comentarios}
                id={item.userId}
                imgUserPro={dataUser?.user?.img}
                idPublicacion={item.id}
                userId={dataUser?.user?.id}
                token={token}
              />
            </DivAllPublicaciones>
          ))}
          {isLoadingAllAmigos && (
            <div style={{position: 'relative', margin: '1rem'}}>
              <Loader></Loader>
            </div>
          )}
        </>
      ) : (
        <p style={{textAlign: 'center'}}>No hay publicaciones</p>
      )}
    </div>
  );
}

export function PublicacionesUser() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);
  const [pagePubli, setPagePubli] = useState(0);
  const token =
    typeof window !== 'undefined'
      ? (localStorage.getItem('token') as string)
      : '';
  const {dataPubliAllAmigosSwr, isLoadingAllAmigos} = GetAllPublicacionesUser(
    token,
    pagePubli
  );
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      if (
        scrollPosition + windowHeight >= documentHeight &&
        dataPubliAllAmigosSwr?.length !== 0
      ) {
        setPagePubli((prevPagePubli) => prevPagePubli + 10);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dataPubliAllAmigosSwr]);
  return (
    <div>
      {publicacionesUser.length > 0 ? (
        publicacionesUser.map((item) => (
          <DivAllPublicaciones key={item.id}>
            <ThemplatePubli
              name={dataUser?.user.fullName}
              description={item.description}
              img={item.img}
              fecha={item.fecha}
              like={item.like}
              comentarios={item.comentarios}
              imgUserPro={dataUser.user.img}
              id={item.userId}
              idPublicacion={item.id}
              userId={dataUser.user.id}
              token={token}
            />
          </DivAllPublicaciones>
        ))
      ) : (
        <p style={{textAlign: 'center'}}>No hay publicaciones</p>
      )}
      {isLoadingAllAmigos && (
        <div style={{position: 'relative', margin: '1rem'}}>
          <Loader></Loader>
        </div>
      )}
    </div>
  );
}

export function ThemplatePubli(props: any) {
  const getAllUserData = useRecoilValue(getAllAmigos);
  const dataIsConnect = useRecoilValue(isConnect);
  const user: any = getAllUserData.find((user: any) => user.id == props.id);
  const [like, setLike] = useState<string>();
  const [comentario, setComentario] = useState(false);
  const [click, setClick] = useState(false);
  const [totalLike, setTotalLike] = useState(props.like.length);
  const [comentariosPubli, setComentariosPubli] = useState(
    props.comentarios.length
  );

  const {dataLike} = LikeODisLike(
    {
      tipo: like,
      id: props.idPublicacion,
      click: click,
    },
    props.token
  );
  useEffect(() => {
    const isLike =
      props?.like?.length > 0 ? props.like?.includes(props.userId) : false;
    setLike(!isLike ? 'disLike' : 'like');
  }, [props.like, props.userId]);
  useEffect(() => {
    if (dataLike) {
      setClick(false);
    }
  }, [dataLike]);
  const handleClickLike = (e: any) => {
    e.preventDefault();

    if (like == 'like') {
      setLike('disLike');
      setTotalLike((prev: number) => prev - 1);
      setClick(true);
      return;
    }
    if (like == 'disLike') {
      setLike('like');
      setTotalLike((prev: number) => prev + 1);
      setClick(true);
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
    <div style={{height: '100%'}}>
      <DivPerfil>
        {user ? (
          <Link href={'/amigos/' + props.id}>
            <FotoPerfil
              img={user?.img}
              width='40'
              hei='40'
              connect={
                dataIsConnect?.find((e: any) => e.id == props.id)?.connect &&
                true
              }></FotoPerfil>
          </Link>
        ) : (
          <FotoPerfil
            connect={
              dataIsConnect?.find((e: any) => e.id == props.id)?.connect && true
            }
            width='40'
            hei='40'
            img={props.imgUser || props.imgUserPro}></FotoPerfil>
        )}
        <div>
          <Body $margin='0'>
            {props.nameUserPerfil || user?.fullName || (props.name && 'Tú')}
          </Body>
          <DivSpan>{props.fecha}</DivSpan>
        </div>
      </DivPerfil>
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
        <DivImage>
          <Image
            src={props?.img}
            alt='portafolio'
            fill
            loading='lazy'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            style={{objectFit: 'cover', borderRadius: '10px'}}
          />
        </DivImage>
      ) : null}
      <DivCantidad>
        {totalLike > 0 ? (
          <SpanIco>
            {' '}
            <Like style={iconConLike} />
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
          id={props.idPublicacion}
          $like={like}>
          <Like />
          Me gusta
        </BottonLike>
        <BottonComentar
          onClick={handleClickOpenComen}
          type='button'
          id={'comentario' + props.idPublicacion}>
          <Comentar />
          Comentar
        </BottonComentar>
      </DivInteractuar>
      {comentario ? (
        <ComentarioPublic
          idPublicacion={props.idPublicacion}
          imgUser={props.imgUser}
          comentarios={props.comentarios}
          userName={user?.fullName || (props.name && 'Tú')}
          name={props.name}
          imgUserPro={props.imgUserPro}
          userId={props.userId}
          id={props.id}
          token={props.token}
          connect={
            dataIsConnect?.find((e: any) => e.id == props.id)?.connect && true
          }
          publicComentario={(isComentario: boolean) =>
            isComentario && setComentariosPubli((prev: number) => prev + 1)
          }
        />
      ) : null}
    </div>
  );
}

function ComentarioPublic(props: any) {
  const [placeInput, setPlaceinput] = useState(true);
  const [content, setContent] = useState('');
  const [click, setClick] = useState(false);
  const [dataComentariosAll, setDaataComentariosAll] = useState<any>(
    props.comentarios
  );
  const [open, setOpen] = useState(props.userId !== props.id ? true : false);

  const {dataComentar} = ComentarPublicacion(
    {
      id: props.idPublicacion,
      fullName: props.name,
      description: content,
      img: props.imgUserPro,
      userId: props.userId,
      open,
      click,
    },
    props.token
  );
  useEffect(() => {
    if (dataComentar) {
      setClick(false);
      setContent('');
    }
  }, [dataComentar]);
  useEffect(() => {
    if (content.length <= 0) {
      setPlaceinput(true);
    }
  }, [content]);
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

  return (
    <div>
      <div
        style={{
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
        }}>
        <DivPerfil>
          <FotoPerfil
            hei='30'
            wid='30'
            img={props.imgUserPro}
            connect={props.connect}></FotoPerfil>
          <DivAñadirComentar>
            <div style={{maxWidth: '100%', minWidth: '200px'}}>
              <ComentarioParrafo
                onInput={handleInput}
                suppressContentEditableWarning={true}
                contentEditable={true}
                $content={placeInput}
                placeholder={content == '' ? `Añadir un comentario` : null}>
                {dataComentar && ''}
              </ComentarioParrafo>
            </div>

            <BottonSendComentario
              onClick={() => {
                if (content) {
                  setClick(true);
                  setDaataComentariosAll((prev: any) => [
                    ...prev,
                    {
                      id: props.idPublicacion,
                      fullName: props.name,
                      description: content,
                      img: props.imgUserPro,
                      userId: props.userId,
                      open,
                    },
                  ]);
                  props.publicComentario(true);
                  return;
                }
                alert('Escribe Algo');
              }}>
              <SendComentPubli />
            </BottonSendComentario>
          </DivAñadirComentar>
        </DivPerfil>
      </div>
      <div>
        {dataComentariosAll?.length > 0
          ? dataComentariosAll.map((e: any, p: any) => {
              return (
                <TemplateComentario
                  key={e.id}
                  userId={e.userId}
                  imgUserPro={props.imgUserPro}
                  imgUser={e.img}
                  userName={e.userId == props.userId ? 'Tú' : e.fullName}
                  description={e.description}></TemplateComentario>
              );
            })
          : null}
      </div>
    </div>
  );
}

function TemplateComentario(props: any) {
  return (
    <div style={{margin: '1rem'}}>
      <DivPerfil>
        {props.userName !== 'Tú' ? (
          <Link href={'/amigos/' + props.userId}>
            <FotoPerfil hei='30' wid='30' img={props.imgUser}></FotoPerfil>
          </Link>
        ) : (
          <FotoPerfil hei='30' wid='30' img={props.imgUserPro}></FotoPerfil>
        )}

        <div
          style={{
            width: '100%',
            backgroundColor: '#2d2d2d',
            padding: '0.5rem',
            borderRadius: '0px 0.5rem 0.5rem',
          }}>
          <p style={{fontSize: '0.9rem', margin: '0'}}>{props.userName}</p>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgb(189 189 189)',
              margin: '0',
            }}>
            {props.description}
          </p>
        </div>
      </DivPerfil>
    </div>
  );
}
