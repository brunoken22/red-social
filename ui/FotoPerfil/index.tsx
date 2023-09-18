import {Figure} from './styled';
const noimg = {
  padding: ' 0.5rem',
  borderRadius: '50%',
  backgroundColor: '#5b5b5b',
  fontSize: 'initial',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export function FotoPerfil(props: any) {
  console.log(props.img);

  return (
    <Figure wid={props.wid + 'px'} hei={props.hei + 'px'}>
      <img
        src={props.img || '/user.webp'}
        width={props.wid || 40}
        height={props.hei || 40}
        alt='perfil'
        loading='lazy'
        style={{borderRadius: '50%', objectFit: 'cover'}}
      />
    </Figure>
  );
}
