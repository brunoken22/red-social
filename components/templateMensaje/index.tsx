'use client';
import {DivAllChat} from '@/ui/container';
import {DivTemMensaje, TemplMensaje, TemplChat, TemplSns, Sms} from './styled';
import {FotoPerfil} from '@/ui/FotoPerfil';
import {Input} from '@/ui/input';
import {BotonSms, ButtonSms} from '@/ui/boton';
export function TemMensaje() {
  const arr = [1, 2, 3, 4];
  return (
    <DivTemMensaje>
      <TemplMensaje>
        <h2>Chats</h2>
        <TemplChat>
          {arr
            ? arr.map((e: any, p: any) => (
                <ButtonSms key={p} id={e}>
                  <DivAllChat>
                    <FotoPerfil />
                    <h4 style={{color: '#fff', margin: 0}}>Allison Lucia</h4>
                  </DivAllChat>
                </ButtonSms>
              ))
            : 'Sin Conversaciones'}
        </TemplChat>
      </TemplMensaje>

      <TemplSns>
        <div
          style={{
            display: 'inherit',
            alignItems: 'center',
            gap: '1rem',
            borderBottom: '1px solid #3b3b3b',
          }}>
          <FotoPerfil />
          <h5>Allison lucia</h5>
        </div>
        <div
          style={{
            minHeight: '650px',
            display: 'inherit',
            flexDirection: 'column',
            gap: '1rem',
          }}>
          <Sms />
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <Input type='text' placeholder='Escribe un mensaje' />
            <BotonSms>Enviar</BotonSms>
          </div>
        </div>
      </TemplSns>
    </DivTemMensaje>
  );
}
