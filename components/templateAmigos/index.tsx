'use client';
import {Section, DivSection, DivIcons, DivResponse, DivResult} from './styled';
import MyAmigos from '@/ui/icons/myAmigos.svg';
import {ButtonNoti, ButtonAgregar} from '@/ui/boton';
import {DivAllAmistades} from '@/ui/container';
import {useState} from 'react';
import {DivImageSug} from '../publicaciones/styled';

export function TemAmigos() {
  const [sugerencia, setSugerencia] = useState(false);
  const [soliAmis, setSoliAmis] = useState(true);
  const [allAmig, setAllAmig] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.id == 'suge') {
      setSugerencia(true);
      setSoliAmis(false);
      setAllAmig(false);
      return;
    }
    if (e.target.id == 'soli') {
      setSoliAmis(true);
      setSugerencia(false);
      setAllAmig(false);
      return;
    }
    if (e.target.id == 'all') {
      setAllAmig(true);
      setSugerencia(false);
      setSoliAmis(false);
      return;
    }
  };
  return (
    <Section>
      <DivSection>
        <h2 style={{marginTop: '0'}}>Amigos</h2>
        <div>
          <ButtonNoti onClick={handleClick} id='suge'>
            <DivIcons>
              <MyAmigos /> {'>'}
            </DivIcons>
            Sugerencia de amistad
          </ButtonNoti>
          <ButtonNoti onClick={handleClick} id='soli'>
            <DivIcons>
              <MyAmigos />
              {'+'}
            </DivIcons>
            Solicitud de amistad
          </ButtonNoti>
          <ButtonNoti onClick={handleClick} id='all'>
            <DivIcons>
              <MyAmigos />
            </DivIcons>
            Todos tus amigos
          </ButtonNoti>
        </div>
      </DivSection>
      <DivResult>
        {sugerencia && !soliAmis && !allAmig ? (
          <>
            <h3 style={{marginTop: '0'}}>Sugerencias de amistad</h3>
            <DivResponse>
              {[1, 2, 3, 4].map((e: any) => (
                <DivAllAmistades key={e}>
                  {' '}
                  <DivImageSug></DivImageSug>
                  <div>
                    <p>Allison Lucia</p>
                    <ButtonAgregar>Añadir amigo</ButtonAgregar>
                  </div>
                </DivAllAmistades>
              ))}
            </DivResponse>
          </>
        ) : null}
        {soliAmis ? (
          <>
            <h3 style={{marginTop: '0'}}>Solicitudes de amistad</h3>
            <DivResponse>
              {true
                ? [1, 2, 3, 4].map((e: any) => (
                    <DivAllAmistades key={e}>
                      {' '}
                      <DivImageSug></DivImageSug>
                      <div>
                        <p>Allison Lucia</p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}>
                          <ButtonAgregar>Aceptar </ButtonAgregar>
                          <ButtonAgregar $bg='red'>Rechazar</ButtonAgregar>
                        </div>
                      </div>
                    </DivAllAmistades>
                  ))
                : 'No hay solicitud de amistad'}
            </DivResponse>
          </>
        ) : null}
        {allAmig ? (
          <>
            <h3 style={{marginTop: '0'}}>Todos tus amigos</h3>
            <DivResponse>
              {true
                ? [1, 2, 3, 4].map((e: any) => (
                    <DivAllAmistades key={e}>
                      <DivImageSug></DivImageSug>

                      <div>
                        <p>Allison Lucia</p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}>
                          <ButtonAgregar $bg='red'>Eliminar</ButtonAgregar>
                        </div>
                      </div>
                    </DivAllAmistades>
                  ))
                : 'No tienes amigos'}
            </DivResponse>
          </>
        ) : null}
      </DivResult>
    </Section>
  );
}
