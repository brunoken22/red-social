'use client';
import {DivConfiguracionPerfil, DIvCongifurar} from './styled';
import {ButtonNoti} from '@/ui/boton';
import {useState} from 'react';
import {EmailYName} from '../conEmailName';
import {Password} from '../conPassword';

export function ConfigPerfil() {
  const [conEmailName, setConEmailName] = useState(true);
  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.id == 'ue') {
      setConEmailName(true);
      return;
    }
    setConEmailName(false);
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
      </div>
      <DIvCongifurar>
        {conEmailName ? <EmailYName /> : <Password />}
      </DIvCongifurar>
    </DivConfiguracionPerfil>
  );
}
