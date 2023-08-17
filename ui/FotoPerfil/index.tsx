import Image from 'next/image';
import {Figure} from './styled';
const imgPerfil = {
  borderRadius: '50%',
};
export function FotoPerfil(props: any) {
  return (
    <Figure $wid={props.wid} $hei={props.hei}>
      <Image
        src='https://res.cloudinary.com/dy26iktoi/image/upload/v1682547589/wgvvfpvwcb8rirrh0ps9.jpg'
        width={props.wid || 40}
        height={props.hei || 40}
        alt='perfil'
        style={imgPerfil}
      />
    </Figure>
  );
}
