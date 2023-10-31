import {Figure} from './styled';
export function FotoPerfil(props: any) {
  return (
    <Figure $wid={props.wid + 'px'} $hei={props.hei + 'px'}>
      <img
        src={
          (props.img == 'false' && '/user.webp') || props.img || '/user.webp'
        }
        width={props.wid || 40}
        height={props.hei || 40}
        alt='perfil'
        loading='lazy'
        style={{borderRadius: '50%', objectFit: 'cover'}}
      />
      {props.connect && (props.hei != 30 || props.hei != 80) ? (
        <div
          style={{
            backgroundColor: 'green',
            height: props.conectHei || '11px',
            width: props.conectHei || '11px',
            position: 'absolute',
            borderRadius: '50%',
            bottom: '0',
            right: '0',
          }}></div>
      ) : null}
    </Figure>
  );
}
