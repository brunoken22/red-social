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
} from './styled';
import Like from '@/ui/icons/like.svg';
import Comentar from '@/ui/icons/comentar.svg';
import {
  publicacionUser,
  user,
  publicacionAmigos,
  getAllAmigos,
} from '@/lib/atom';
import {useRecoilValue} from 'recoil';

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
  return (
    <div>
      {publicacionesAmigos?.length > 0 ? (
        publicacionesAmigos
          .slice()
          .reverse()
          .map((item) => (
            <DivAllPublicaciones key={item.id}>
              <ThemplatePubli
                name={dataUser?.user.fullName}
                description={item.description}
                img={item.img}
                fecha={item.fecha}
                like={item.like}
                comentarios={item.comentarios?.length}
                imgUser={item}
                id={item.userId}
              />
            </DivAllPublicaciones>
          ))
      ) : (
        <p style={{textAlign: 'center'}}>No hay publicaciones</p>
      )}
    </div>
  );
}

export function PublicacionesUser() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);

  return (
    <div>
      {publicacionesUser.length > 0 ? (
        publicacionesUser
          .slice()
          .reverse()
          .map((item) => (
            <DivAllPublicaciones key={item.id}>
              <ThemplatePubli
                name={dataUser?.user.fullName}
                description={item.description}
                img={item.img}
                fecha={item.fecha}
                like={item.like}
                comentarios={item.comentarios?.length}
              />
            </DivAllPublicaciones>
          ))
      ) : (
        <p style={{textAlign: 'center'}}>No hay publicaciones</p>
      )}
    </div>
  );
}

function ThemplatePubli(props: any) {
  const getAllAmigosData = useRecoilValue(getAllAmigos);
  const user: any = getAllAmigosData.find((user: any) => user.id == props.id);
  return (
    <div style={{height: '100%'}}>
      <DivPerfil>
        <FotoPerfil img={user?.img} fullName={user?.fullName[0]}></FotoPerfil>
        <div>
          <Body $margin='0'>{user?.fullName || props.name}</Body>
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
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            loading='lazy'
            style={{objectFit: 'cover', borderRadius: '10px'}}
          />
        </DivImage>
      ) : null}
      <DivCantidad>
        <SpanIco>
          {' '}
          <Like style={iconConLike} />
          {props.like || 0}
        </SpanIco>
        <SpanIco>
          <DivSpan>Comentarios {props.comentarios || 0} </DivSpan>
        </SpanIco>
      </DivCantidad>
      <DivInteractuar>
        <BottonLike type='button'>
          <Like />
        </BottonLike>
        <BottonComentar type='button'>
          <Comentar />
        </BottonComentar>
      </DivInteractuar>
    </div>
  );
}
