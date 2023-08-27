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

const iconConLike = {
  height: ' 10px',
  width: ' 10px',
  border: '1px solid #ddd',
  borderRadius: '50%',
  padding: '2px',
  backgroundColor: '#5a81ff',
};
import {publicacionUser, user} from '@/lib/atom';
import {useRecoilValue} from 'recoil';

export function Publicaciones() {
  const publicacionesUser = useRecoilValue(publicacionUser);
  const dataUser = useRecoilValue(user);

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
  return (
    <div style={{height: '100%'}}>
      <DivPerfil>
        <FotoPerfil></FotoPerfil>
        <div>
          <Body $margin='0'>{props.name}</Body>
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
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            loading='eager'
            style={{objectFit: 'cover'}}
          />
        </DivImage>
      ) : null}
      <DivCantidad>
        <SpanIco>
          {' '}
          <Like style={iconConLike} />
          30 personas
        </SpanIco>
        <SpanIco>
          <DivSpan> 30 comentarios</DivSpan>
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
