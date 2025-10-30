"use client";
import dynamic from "next/dynamic";
import { Section, DivSection, DivIcons, DivResponse, DivResult } from "./styled";
import { ButtonNoti } from "@/ui/boton";
import { Dispatch, SetStateAction, useState } from "react";
import { LoaderRequest } from "../loader";
import { GetFriendAccepted, GetFriendSend, GetFriendPending, GetFriendReceived } from "@/lib/hook";
import { DivNotificacionActi } from "../header/styled";
import { FiUserPlus, FiUsers, FiSend } from "react-icons/fi";
import {
  useFriendAll,
  useReceivedUserStore,
  useSendUserStore,
  useSuggestionUserStore,
} from "@/lib/store";

const TemplateFriendRequest = dynamic(() => import("../templateFriends"), {
  loading: () => <LoaderRequest />,
});

export type HandleActionsFriend = {
  id: string;
  setIsLoading: Dispatch<SetStateAction<string | false>>;
};

export default function AmigosComponent() {
  const suggestioonUsers = useSuggestionUserStore((state) => state.suggestioonUsers);
  const receivedUsers = useReceivedUserStore((state) => state.receivedUsers);
  const senderUsers = useSendUserStore((state) => state.senderUsers);
  const friendAll = useFriendAll((state) => state.friendAll);

  const [sugerencia, setSugerencia] = useState(false);
  const [soliAmis, setSoliAmis] = useState(true);
  const [allAmig, setAllAmig] = useState(false);
  const [soliEnv, setSoliEnv] = useState(false);

  const { mutateAccepted } = GetFriendAccepted();
  const { mutateReceived } = GetFriendReceived();
  const { mutatePending } = GetFriendPending();
  const { mutateSend } = GetFriendSend();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.id;

    setSugerencia(targetId === "suge");
    setSoliAmis(targetId === "soli");
    setAllAmig(targetId === "all");
    setSoliEnv(targetId === "SoliEnv");
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
                <FiUserPlus className='inline mr-1' size='26' />
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
              {receivedUsers.length > 0 && (
                <DivNotificacionActi>{receivedUsers.length}</DivNotificacionActi>
              )}
              <DivIcons className='max-md:hidden'>
                <FiUserPlus className='inline mr-1' size='26' />
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
                <FiUsers className='inline mr-1' size='26' />
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
                <FiSend className='inline mr-1' size='26' />
              </DivIcons>
              Solicitud Enviado
            </ButtonNoti>
          </div>
        </div>
      </DivSection>

      <DivResult>
        {sugerencia && (
          <>
            <h3 className='font-semibold text-start text-xl mb-4'>Sugerencias de amistad</h3>
            <DivResponse>
              {suggestioonUsers.length > 0
                ? suggestioonUsers.map((user) => (
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
        )}

        {soliAmis && (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4'>Solicitudes de amistad</h3>
            <DivResponse>
              {receivedUsers.length > 0
                ? receivedUsers.map((user) => (
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
        )}

        {allAmig && (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4 mt-0'>Todos tus amigos</h3>
            <DivResponse>
              {friendAll.length > 0
                ? friendAll.map((user) => (
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
        )}

        {soliEnv && (
          <>
            <h3 className='font-semibold text-start  text-xl mb-4  mt-0'>Solicitud Enviado</h3>
            <DivResponse>
              {senderUsers.length > 0
                ? senderUsers.map((user) => (
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
        )}
      </DivResult>
    </Section>
  );
}
