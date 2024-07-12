'use client';
import {DivConfiguracionPerfil, DIvCongifurar} from './styled';
import {ButtonNoti} from '@/ui/boton';
import {useState} from 'react';
import {EmailYName} from '../conEmailName';
import {Password} from '../conPassword';
import VerificationUser from '../verificationUser';
import {useRecoilValue} from 'recoil';
import {user} from '@/lib/atom';

type ButtonType = 'ue' | 'co' | 'sv';

export function ConfigPerfil() {
  const userData = useRecoilValue(user);
  const [conEmailName, setConEmailName] = useState<ButtonType>('ue');
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConEmailName(e.currentTarget.id as ButtonType);
  };
  return (
    <DivConfiguracionPerfil>
      <div>
        <ButtonNoti onClick={handleClick} id='ue'>
          Cambiar nombre usuario y email
        </ButtonNoti>
        <ButtonNoti onClick={handleClick} id='co'>
          Cambiar contraseña
        </ButtonNoti>
        <ButtonNoti onClick={handleClick} id='sv'>
          Solicitar Verificación
        </ButtonNoti>
      </div>
      <DIvCongifurar>
        {conEmailName == 'ue' ? (
          <EmailYName
            fullName={userData.user.fullName}
            email={userData.user.email}
          />
        ) : null}
        {conEmailName == 'co' ? <Password /> : null}
        {conEmailName == 'sv' ? (
          <VerificationUser
            email={userData.user.email}
            verification={userData.user.verification}
          />
        ) : null}
      </DIvCongifurar>
    </DivConfiguracionPerfil>
  );
}
