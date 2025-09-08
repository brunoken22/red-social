"use client";
import dynamic from "next/dynamic";
import { Section, DivSection, DivIcons, DivResponse, DivResult } from "./styled";
import { ButtonNoti } from "@/ui/boton";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  getAllAmigos,
  getAllSolicitudesRecibidas,
  getAllSolicitudesEnviadas,
  getSugerenciaAmigos,
} from "@/lib/atom";
import { LoaderRequest } from "../loader";
import { GetFriendAccepted, GetFriendSend, GetFriendPending, GetFriendReceived } from "@/lib/hook";
import { DivNotificacionActi } from "../header/styled";

const TemplateFriendRequest = dynamic(() => import("../templateFriends"), {
  loading: () => <LoaderRequest />,
});
export type HandleActionsFriend = {
  id: string;
  setIsLoading: Dispatch<SetStateAction<string | false>>;
};
export default function AmigosComponent() {
  const dataAllUser = useRecoilValue(getSugerenciaAmigos);
  const dataAllAmigos = useRecoilValue(getAllAmigos);
  const dataAllSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const dataAllSoliEnv = useRecoilValue(getAllSolicitudesEnviadas);
  const [sugerencia, setSugerencia] = useState(false);
  const [soliAmis, setSoliAmis] = useState(true);
  const [allAmig, setAllAmig] = useState(false);
  const [soliEnv, setSoliEnv] = useState(false);
  const { mutateAccepted } = GetFriendAccepted();
  const { mutatePending } = GetFriendPending();
  const { mutateSend } = GetFriendSend();
  const { mutateReceived } = GetFriendReceived();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (e.currentTarget.id == "suge") {
      setSugerencia(true);
      setSoliAmis(false);
      setAllAmig(false);
      setSoliEnv(false);
      return;
    }
    if (e.currentTarget.id == "soli") {
      setSoliAmis(true);
      setSugerencia(false);
      setAllAmig(false);
      setSoliEnv(false);

      return;
    }
    if (e.currentTarget.id == "all") {
      setAllAmig(true);
      setSugerencia(false);
      setSoliAmis(false);
      setSoliEnv(false);

      return;
    }
    if (e.currentTarget.id == "SoliEnv") {
      setAllAmig(false);
      setSugerencia(false);
      setSoliEnv(true);
      setSoliAmis(false);
      return;
    }
  };
  const handleSolicitudEnv = async ({ id, setIsLoading }: HandleActionsFriend) => {
    setIsLoading(id);
    const createSolicitud = await import("@/lib/hook").then((mod) => mod.createSolicitud);
    await createSolicitud({
      amigoId: Number(id),
    });
    await mutateSend();
    await mutateReceived();
    await mutateAccepted();
    await mutatePending();

    setIsLoading(false);
  };
  const handleSolicitudAcep = async ({ id, setIsLoading }: HandleActionsFriend) => {
    setIsLoading(id);

    const aceptarSolicitud = await import("@/lib/hook").then((mod) => mod.aceptarSolicitud);
    await aceptarSolicitud(Number(id));
    await mutateSend();
    await mutateReceived();
    await mutateAccepted();
    await mutatePending();

    setIsLoading(false);
  };
  const handleSolicitudRecha = async ({ id, setIsLoading }: HandleActionsFriend) => {
    setIsLoading(id);
    const rechazarSolicitud = await import("@/lib/hook").then((mod) => mod.rechazarSolicitud);
    await rechazarSolicitud({
      userId: Number(id),
    });
    await mutateSend();
    await mutateReceived();
    await mutateAccepted();
    await mutatePending();

    setIsLoading(false);
  };
  const handleEliminarAmigo = async ({ id, setIsLoading }: HandleActionsFriend) => {
    setIsLoading(id);
    const eliminarAmigo = await import("@/lib/hook").then((mod) => mod.eliminarAmigo);
    await eliminarAmigo(Number(id));
    await mutateSend();
    await mutateReceived();
    await mutateAccepted();
    await mutatePending();
    setIsLoading(false);
  };

  return (
    <Section>
      <DivSection>
        <div className='sticky top-16 z-[9]'>
          <h2 className='font-semibold text-2xl text-start p-2 pb-3 pt-0'>Amigos</h2>
          <div className='flex flex-col max-md:flex-row gap-2 max-md:flex-wrap'>
            <ButtonNoti
              onClick={handleClick}
              id='suge'
              open={sugerencia}
              className={`w-auto ${
                sugerencia ? "bg-light text-primary  !opacity-100 !cursor-default" : ""
              } `}
            >
              <DivIcons className='max-md:hidden'>
                <img
                  src='/icons/myAmigos.svg'
                  alt='Sugerencia de amistad'
                  title='Sugerencia de amistad'
                />{" "}
                {">"}
              </DivIcons>
              Sugerencia de amistad
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='soli'
              open={soliAmis}
              className={`w-auto relative  !opacity-100 ${
                soliAmis ? "bg-light text-primary  !opacity-100 !cursor-default " : ""
              }  `}
            >
              {dataAllSoliReci ? (
                dataAllSoliReci.length ? (
                  <DivNotificacionActi>{dataAllSoliReci.length}</DivNotificacionActi>
                ) : null
              ) : null}
              <DivIcons className='max-md:hidden'>
                <img
                  src='/icons/myAmigos.svg'
                  alt='Solicitud de amistad'
                  title='Solicitud de amistad'
                />
                {"+"}
              </DivIcons>
              Solicitud de amistad
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='all'
              open={allAmig}
              className={`w-auto ${
                allAmig ? "bg-light text-primary !opacity-100 !cursor-default" : ""
              }`}
            >
              <DivIcons className='max-md:hidden'>
                <img src='/icons/myAmigos.svg' alt=' Todos tus amigos' title=' Todos tus amigos' />
              </DivIcons>
              Todos tus amigos
            </ButtonNoti>
            <ButtonNoti
              onClick={handleClick}
              id='SoliEnv'
              open={soliEnv}
              className={`w-auto ${
                soliEnv ? "bg-light text-primary !opacity-100 !cursor-default" : ""
              } `}
            >
              <DivIcons className='max-md:hidden'>
                <img src='/icons/myAmigos.svg' alt='Solicitud Enviado' title='Solicitud Enviado' />
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
                      handleSolicitudEnv={handleSolicitudEnv}
                      handleSolicitudAcep={handleSolicitudAcep}
                      handleSolicitudRecha={handleSolicitudRecha}
                      handleEliminarAmigo={handleEliminarAmigo}
                    />
                  ))
                : "Sin Usuarios"}
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
                      handleSolicitudEnv={handleSolicitudEnv}
                      handleSolicitudAcep={handleSolicitudAcep}
                      handleSolicitudRecha={handleSolicitudRecha}
                      handleEliminarAmigo={handleEliminarAmigo}
                    />
                  ))
                : "No hay solicitud de amistad"}
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
                      typeRequest={"allFriend"}
                      requestClassDuo={false}
                      handleSolicitudEnv={handleSolicitudEnv}
                      handleSolicitudAcep={handleSolicitudAcep}
                      handleSolicitudRecha={handleSolicitudRecha}
                      handleEliminarAmigo={handleEliminarAmigo}
                    />
                  ))
                : "No tienes amigos"}
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
                      typeRequest={"requestSent"}
                      requestClassDuo={false}
                      handleSolicitudEnv={handleSolicitudEnv}
                      handleSolicitudAcep={handleSolicitudAcep}
                      handleSolicitudRecha={handleSolicitudRecha}
                      handleEliminarAmigo={handleEliminarAmigo}
                    />
                  ))
                : "No enviastes solicitudes"}
            </DivResponse>
          </>
        ) : null}
      </DivResult>
    </Section>
  );
}
