import {Figure} from './styled';
import {useRecoilValue} from 'recoil';
import {user} from '@/lib/atom';

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
  const dataUser = useRecoilValue(user);
  return (
    <Figure $wid={props.wid} $hei={props.hei}>
      {dataUser?.user.img || props.img ? (
        <img
          src={props.img || dataUser.user.img}
          width={props.wid || 40}
          height={props.hei || 40}
          alt='perfil'
          loading='lazy'
          style={{borderRadius: '50%', objectFit: 'cover'}}
        />
      ) : props.wid ? (
        <div
          style={{
            ...noimg,
            width: props.wid + 'px',
            height: props.hei + 'px',
            fontSize: 'xx-large',
          }}>
          <span style={{textAlign: 'center'}}>
            {dataUser?.user.fullName[0]}
          </span>
        </div>
      ) : (
        <div style={{...noimg, width: '25px'}}>
          <span style={{textAlign: 'center'}}>
            {props?.fullName || dataUser?.user.fullName[0]}
          </span>
        </div>
      )}
    </Figure>
  );
}
