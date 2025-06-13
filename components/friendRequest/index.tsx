'use client';
import dynamic from 'next/dynamic';
import { Section, DivSection, DivIcons, DivResponse, DivResult } from './styled';
import MyAmigos from '@/ui/icons/myAmigos.svg';
import { ButtonNoti } from '@/ui/boton';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getAllAmigos,
  getAllSolicitudesRecibidas,
  getAllSolicitudesEnviadas,
  getSugerenciaAmigos,
} from '@/lib/atom';
import { LoaderRequest } from '../loader';

const TemplateFriendRequest = dynamic(() => import('../templateFriends'), {
  loading: () => <LoaderRequest />,
});

export default function AmigosComponent() {
  const dataAllUser = useRecoilValue(getSugerenciaAmigos);
  const dataAllAmigos = useRecoilValue(getAllAmigos);
  const dataAllSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataAllSoliEnv = useRecoilValue(getAllSolicitudesEnviadas);
  const [sugerencia, setSugerencia] = useState(false);
  const [soliAmis, setSoliAmis] = useState(true);
  const [allAmig, setAllAmig] = useState(false);
  const [soliEnv, setSoliEnv] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
    if (e.target.id == 'suge') {
      setSugerencia(true);
      setSoliAmis(false);
      setAllAmig(false);
      setSoliEnv(false);
      return;
    }
    if (e.target.id == 'soli') {
      setSoliAmis(true);
      setSugerencia(false);
      setAllAmig(false);
      setSoliEnv(false);

      return;
    }
    if (e.target.id == 'all') {
      setAllAmig(true);
      setSugerencia(false);
      setSoliAmis(false);
      setSoliEnv(false);

      return;
    }
    if (e.target.id == 'SoliEnv') {
      setAllAmig(false);
      setSugerencia(false);
      setSoliEnv(true);
      setSoliAmis(false);
      return;
    }
  };

  return (
    <Section>
      <DivSection>
        <div className='sticky top-16 z-[9]'>
          <h2 className='font-semibold text-2xl text-start p-2 pb-3'>Amigos</h2>
          <div className='flex flex-col max-md:flex-row gap-2 max-md:flex-wrap'>
            <ButtonNoti
              onClick={handleClick}
              id='suge'
              open={sugerencia}
              className={`w-auto ${
                sugerencia ? 'bg-light text-primary  !opacity-100 !cursor-default' : ''
              } `}>
              <DivIcons className='max-md:hidden'>
                <MyAmigos /> {'>'}
              </DivIcons>
              Sugerencia de amistad
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='soli'
              open={soliAmis}
              className={`w-auto  !opacity-100 ${
                soliAmis ? 'bg-light text-primary  !opacity-100 !cursor-default ' : ''
              }  `}>
              <DivIcons className='max-md:hidden'>
                <MyAmigos />
                {'+'}
              </DivIcons>
              Solicitud de amistad
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='all'
              open={allAmig}
              className={`w-auto ${
                allAmig ? 'bg-light text-primary !opacity-100 !cursor-default' : ''
              }`}>
              <DivIcons className='max-md:hidden'>
                <MyAmigos />
              </DivIcons>
              Todos tus amigos
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='SoliEnv'
              open={soliEnv}
              className={`w-auto ${
                soliEnv ? 'bg-light text-primary !opacity-100 !cursor-default' : ''
              } `}>
              <DivIcons className='max-md:hidden'>
                <MyAmigos />
              </DivIcons>
              Solicitud Enviado
            </ButtonNoti>
          </div>
        </div>
      </DivSection>
      <DivResult>
        {sugerencia && !soliAmis && !allAmig ? (
          <>
            <h3 className='font-semibold text-start text-xl mb-4'>Sugerencias de amistad</h3>
            <DivResponse>
              {dataAllUser?.length > 0
                ? dataAllUser?.map((user) => (
                    <TemplateFriendRequest
                      key={user.id}
                      id={user.id}
                      fullName={user.fullName}
                      img={user.img}
                      requestClassDuo={false}
                      typeRequest='suggestion'
                    />
                  ))
                : 'Sin Usuarios'}
            </DivResponse>
          </>
        ) : null}
        {soliAmis ? (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4'>Solicitudes de amistad</h3>
            <DivResponse>
              {dataAllSoliReci?.length > 0
                ? dataAllSoliReci.map((user) => (
                    <TemplateFriendRequest
                      key={user.id}
                      id={user.id}
                      fullName={user.fullName}
                      img={user.img}
                      requestClassDuo={true}
                      typeRequest='requestFriend'
                    />
                  ))
                : 'No hay solicitud de amistad'}
            </DivResponse>
          </>
        ) : null}
        {allAmig ? (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4 mt-0'>Todos tus amigos</h3>
            <DivResponse>
              {dataAllAmigos.data?.length > 0
                ? dataAllAmigos.data.map((user) => (
                    <TemplateFriendRequest
                      key={user.id}
                      id={user.id}
                      fullName={user.fullName}
                      img={user.img}
                      typeRequest={'allFriend'}
                      requestClassDuo={false}
                    />
                  ))
                : 'No tienes amigos'}
            </DivResponse>
          </>
        ) : null}
        {soliEnv ? (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4  mt-0'>Solicitud Enviado</h3>
            <DivResponse>
              {dataAllSoliEnv?.length > 0
                ? dataAllSoliEnv.map((user) => (
                    <TemplateFriendRequest
                      key={user.id}
                      id={user.id}
                      fullName={user.fullName}
                      img={user.img}
                      typeRequest={'requestSent'}
                      requestClassDuo={false}
                    />
                  ))
                : 'No enviastes solicitudes'}
            </DivResponse>
          </>
        ) : null}
      </DivResult>
    </Section>
  );
}
