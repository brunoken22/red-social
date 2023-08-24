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
      <div style={{padding: '1rem', fontSize: '0.9rem', fontWeight: '100'}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam amet
        temporibus deleniti nisi dicta saepe soluta velit perspiciatis quia
        cumque dolorum ad, porro perferendis tenetur enim! Iusto ullam
        recusandae minus.
      </div>
      <DivImage>
        <Image
          src={'/portafolio.png'}
          alt='portafolio'
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading='eager'
          style={{objectFit: 'cover'}}
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
