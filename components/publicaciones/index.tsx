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
const iconConComentar = {
  height: ' 10px',
  width: ' 10px',
  border: '1px solid #ddd',
  'border-radius': '50%',
  padding: '2px',
  'background-color': '#84e981',
};
export function Publicaciones() {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((item) => (
        <DivAllPublicaciones key={item}>
          <ThemplatePubli />
        </DivAllPublicaciones>
      ))}
    </div>
  );
}

function ThemplatePubli(props: any) {
  return (
    <div style={{height: '100%'}}>
      <DivPerfil>
        <FotoPerfil></FotoPerfil>
        <div>
          <Body $margin='0'>Bruno ken</Body>
          <DivSpan>11/20/26</DivSpan>
        </div>
      </DivPerfil>
      <DivImage>
        <Image
          src={'/portafolio.png'}
          width={10}
          height={0}
          alt='portafolio'
          layout='responsive'
        />
      </DivImage>
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
