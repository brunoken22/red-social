'use client';
import { DivConfiguracionPerfil, DIvCongifurar } from './styled';
import { ButtonNoti } from '@/ui/boton';
import { useState } from 'react';
import { EmailYName } from '../conEmailName';
import { Password } from '../conPassword';
import VerificationUser from '../verificationUser';
import { useRecoilValue } from 'recoil';
import { user } from '@/lib/atom';

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
        <h1 className='font-semibold text-2xl text-start p-2 pb-3'>Configuración</h1>
        <div
          className='max-md:flex max-md:flex-wrap
        max-md:gap-2'>
          <ButtonNoti onClick={handleClick} className={conEmailName == 'ue' ? 'opacity-70' : ''} id='ue'>
            Cambiar nombre usuario y email
          </ButtonNoti>
          <ButtonNoti onClick={handleClick} id='co' className={conEmailName == 'co' ? 'opacity-70' : ''}>
            Cambiar contraseña
          </ButtonNoti>
          <ButtonNoti onClick={handleClick} id='sv' className={conEmailName == 'sv' ? 'opacity-70' : ''}>
            Solicitar Verificación
          </ButtonNoti>
        </div>
      </div>
      <DIvCongifurar>
        {conEmailName == 'ue' ? <EmailYName fullName={userData.user.fullName} email={userData.user.email} /> : null}
        {conEmailName == 'co' ? <Password /> : null}
        {conEmailName == 'sv' ? <VerificationUser email={userData.user.email} verification={userData.user.verification} /> : null}
      </DIvCongifurar>
    </DivConfiguracionPerfil>
  );
}
