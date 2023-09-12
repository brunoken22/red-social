'use client';
import {Section, DivSection, DivIcons, DivResponse, DivResult} from './styled';
import MyAmigos from '@/ui/icons/myAmigos.svg';
import {ButtonNoti, ButtonAgregar} from '@/ui/boton';
import {DivAllAmistades} from '@/ui/container';
import {useEffect, useState} from 'react';
import {DivImageSug} from '../publicaciones/styled';
import {useRecoilValue} from 'recoil';
import {
  User,
  getAllUser,
  getAllAmigos,
  getAllSolicitudesRecibidas,
  getAllSolicitudesEnviadas,
} from '@/lib/atom';
import {
  CreateSolicitud,
  AceptarSolicitud,
  RechazarSolicitud,
  EliminarAmigo,
} from '@/lib/hook';
import {Loader} from '../loader';
import Link from 'next/link';

export function TemAmigos() {
  const dataAllUser = useRecoilValue(getAllUser);
  const dataAllAmigos = useRecoilValue(getAllAmigos);
  const dataAllSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataAllSoliEnv = useRecoilValue(getAllSolicitudesEnviadas);

  const [sugerencia, setSugerencia] = useState(false);
  const [soliAmis, setSoliAmis] = useState(true);
  const [allAmig, setAllAmig] = useState(false);
  const [soliEnv, setSoliEnv] = useState(false);
  const [amigoId, setAmigoId] = useState(Number(-1));
  const [acepAmigoId, setAcepAmigoId] = useState(Number(-1));
  const [rechazarAmigo, setRechazarAmigo] = useState(Number(-1));
  const [eliminarAmigo, setEliminarAmigo] = useState(Number(-1));

  const {dataCreateSoli, isLoadCreateSoli} = CreateSolicitud({
    amigoId,
    estado: false,
  });
  const {dataAcep, isLoadingAcep} = AceptarSolicitud({
    amigoId: acepAmigoId,
    estado: true,
  });
  const {dataRech, isLoadingRech} = RechazarSolicitud({
    userId: rechazarAmigo,
  });
  const {dataElimAmigo, isLoadingElimAmigo} = EliminarAmigo({
    userId: eliminarAmigo,
  });
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
  const handleSolicitudEnv = (e: any) => {
    const id = e.target.id;
    setAmigoId(Number(id));
  };
  const handleSolicitudAcep = (e: any) => {
    const id = e.target.id;
    console.log(id);
    setAcepAmigoId(Number(id));
  };
  const handleSolicitudRecha = (e: any) => {
    const id = e.target.id;
    setRechazarAmigo(Number(id));
  };
  const handleEliminarAmigo = (e: any) => {
    const id = e.target.id;
    setEliminarAmigo(Number(id));
  };

  useEffect(() => {
    if (dataCreateSoli || dataAcep || dataRech || dataElimAmigo) {
      setAmigoId(Number(-1));
      setAcepAmigoId(Number(-1));
      setRechazarAmigo(Number(-1));
      setEliminarAmigo(Number(-1));
    }
  }, [dataAcep, dataRech, eliminarAmigo, dataCreateSoli]);
  if (
    isLoadCreateSoli ||
    isLoadingAcep ||
    isLoadingRech ||
    isLoadingElimAmigo
  ) {
    return <Loader></Loader>;
  }
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
          <ButtonNoti onClick={handleClick} id='SoliEnv'>
            <DivIcons>
              <MyAmigos />
            </DivIcons>
            Solicitud Enviado
          </ButtonNoti>
        </div>
      </DivSection>
      <DivResult>
        {sugerencia && !soliAmis && !allAmig ? (
          <>
            <h3 style={{marginTop: '0'}}>Sugerencias de amistad</h3>
            <DivResponse>
              {dataAllUser?.length > 0
                ? dataAllUser?.map((e: User) => (
                    <DivAllAmistades key={e.id}>
                      {' '}
                      <Link href={'/amigos/' + e.id}>
                        {' '}
                        <DivImageSug $img={e.img}></DivImageSug>
                      </Link>
                      <div>
                        <p style={{overflow: 'hidden', height: '1.5rem'}}>
                          {e.fullName}
                        </p>
                        <ButtonAgregar
                          id={e.id}
                          onClick={handleSolicitudEnv}
                          $bg={dataCreateSoli ? 'red' : 'blue'}>
                          {dataCreateSoli
                            ? 'Cancelar Solicitud'
                            : 'Añadir amigo'}
                        </ButtonAgregar>
                      </div>
                    </DivAllAmistades>
                  ))
                : 'Sin Usuarios'}
            </DivResponse>
          </>
        ) : null}
        {soliAmis ? (
          <>
            <h3 style={{marginTop: '0'}}>Solicitudes de amistad</h3>
            <DivResponse>
              {dataAllSoliReci?.length > 0
                ? dataAllSoliReci.map((e: any) => (
                    <DivAllAmistades key={e.id}>
                      {' '}
                      <Link href={'/amigos/' + e.id}>
                        {' '}
                        <DivImageSug $img={e.img}></DivImageSug>
                      </Link>{' '}
                      <div>
                        <p style={{overflow: 'hidden', height: '1.5rem'}}>
                          {e.fullName}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}>
                          <ButtonAgregar
                            id={e.id}
                            onClick={handleSolicitudAcep}>
                            Aceptar{' '}
                          </ButtonAgregar>
                          <ButtonAgregar
                            id={e.id}
                            onClick={handleSolicitudRecha}
                            $bg='red'>
                            Rechazar
                          </ButtonAgregar>
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
              {dataAllAmigos?.length > 0
                ? dataAllAmigos.map((e: any) => (
                    <DivAllAmistades key={e.id}>
                      <Link href={'/amigos/' + e.id}>
                        {' '}
                        <DivImageSug $img={e.img}></DivImageSug>
                      </Link>
                      <div>
                        <p style={{overflow: 'hidden', height: '1.5rem'}}>
                          {e.fullName}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}>
                          <ButtonAgregar
                            id={e.id}
                            onClick={handleEliminarAmigo}
                            $bg='red'>
                            Eliminar
                          </ButtonAgregar>
                        </div>
                      </div>
                    </DivAllAmistades>
                  ))
                : 'No tienes amigos'}
            </DivResponse>
          </>
        ) : null}
        {soliEnv ? (
          <>
            <h3 style={{marginTop: '0'}}>Solicitud Enviado</h3>
            <DivResponse>
              {dataAllSoliEnv?.length > 0
                ? dataAllSoliEnv.map((e: any) => (
                    <DivAllAmistades key={e.id}>
                      <Link href={'/amigos/' + e.id}>
                        {' '}
                        <DivImageSug $img={e.img}></DivImageSug>
                      </Link>
                      <div>
                        <p style={{overflow: 'hidden', height: '1.5rem'}}>
                          {e.fullName}
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem',
                          }}>
                          <ButtonAgregar
                            id={e.id}
                            onClick={handleSolicitudRecha}
                            $bg='red'>
                            Eliminar Solicitud
                          </ButtonAgregar>
                        </div>
                      </div>
                    </DivAllAmistades>
                  ))
                : 'No enviastes solicitudes'}
            </DivResponse>
          </>
        ) : null}
      </DivResult>
    </Section>
  );
}
