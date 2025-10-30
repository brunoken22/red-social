"use client";
import dynamic from "next/dynamic";
import { DivAllChat } from "@/ui/container";
import { DivTemMensaje, TemplMensaje, TemplChat, SpanNoti } from "./styled";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LuMessageSquare, LuUsers } from "react-icons/lu";
import { GetAllUserChat } from "@/lib/hook";
import Link from "next/link";
import { LoaderRequest } from "../loader";
import {
  useIsConnected,
  useMessagesUserStore,
  useMessageWritingStore,
  useOpenChatUser,
  User,
  useUser,
} from "@/lib/store";

const TemplateChat = dynamic(() => import("./templateChat"), {
  loading: () => <LoaderRequest />,
});
const Verification = dynamic(() => import("@/ui/verification"), {
  loading: () => <LoaderRequest />,
});
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"), {
  loading: () => <LoaderRequest />,
});
const Loader = dynamic(() => import("../loader").then((mod) => mod.Loader), {
  loading: () => <LoaderRequest />,
});

export type MessageUserChat = {
  rtdb: string | undefined;
  message?: string;
  read?: boolean;
  fullName: string;
  img: string;
  status: "Enviado" | "Recibido" | "Leido";
  id: string;
  date: Date | "";
  lastChanged: Date | "";
  receip_id?: number;
};
export type QueryParamsType = string;

export function TemMensaje({
  userChat,
}: {
  userChat: {
    user: { id: number; fullName: string; img: string; rtdb: string };
    chat_rtdb: string;
  } | null;
}) {
  const { replace } = useRouter();
  const user = useUser((state) => state.user);
  const connected = useIsConnected((state) => state.connected);
  const messages = useMessagesUserStore((state) => state.messages);
  const messagesWriting = useMessageWritingStore((state) => state.messagesWriting);

  const [dataMensajeUser, setDataMensajeUser] = useState<MessageUserChat>();
  const { data, isLoading } = GetAllUserChat();
  const setOpenChatUserValue = useOpenChatUser((state) => state.setChatUser);

  // Cerrar chat del usuario [ID]
  const handleCloseChat = () => {
    setDataMensajeUser({
      rtdb: "",
      message: "",
      read: false,
      fullName: "",
      img: "",
      status: "Enviado",
      id: "",
      date: "",
      lastChanged: "",
    });
    setOpenChatUserValue("");
    replace("/chat");
  };

  useEffect(() => {
    if (userChat?.user) {
      const rtdbParams = userChat?.chat_rtdb;
      const imgParams = userChat?.user.img;
      const fullNameParams = userChat?.user.fullName;
      const idParams = userChat?.user.id.toString();

      if (rtdbParams && idParams && fullNameParams) {
        const miArrayRTDB = rtdbParams.split(",");
        const rtdbId = existenElementosSimilares(miArrayRTDB, user.rtdb);

        setDataMensajeUser({
          fullName: fullNameParams,
          img: imgParams || "/user.webp",
          id: idParams,
          rtdb: rtdbId,
          status: "Enviado",
          date: "",
          lastChanged: "",
        });

        setOpenChatUserValue(rtdbId || "");
      }
    }
  }, [userChat]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseChat();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (isLoading) return <Loader />;

  // Función para ordenar los chats
  const getSortedChats = () => {
    if (!data) return [];

    // Separamos en dos grupos: no leídos y el resto
    const unreadChats: Array<{ user: User; date: Date }> = [];
    const readChats: Array<{ user: User; date: Date }> = [];

    data.forEach((user: User) => {
      const rtdbId = existenElementosSimilares(user.rtdb, user.rtdb as []);
      const message = messages.find((item) => item.rtdb === rtdbId);

      if (message) {
        const messageDate = new Date(message.date);
        if (!message.read && message.id !== user.id) {
          unreadChats.push({ user, date: messageDate });
        } else {
          readChats.push({ user, date: messageDate });
        }
      }
    });

    // Ordenamos cada grupo por fecha (más reciente primero)
    unreadChats.sort((a, b) => b.date.getTime() - a.date.getTime());
    readChats.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Concatenamos: primero no leídos ordenados por fecha, luego leídos ordenados por fecha
    return [...unreadChats.map((item) => item.user), ...readChats.map((item) => item.user)];
  };

  const sortedData = getSortedChats();

  console.log("Chat usuarios: ", messages, data);
  return (
    <DivTemMensaje>
      {sortedData?.length && !isLoading ? (
        <>
          <div
            className={`w-1/4  max-md:w-full ${
              !dataMensajeUser?.id ? "block " : "max-md:hidden block"
            } h-[85vh] overflow-auto`}
          >
            {user.id ? (
              <TemplMensaje mobile={true}>
                <h2 className='text-2xl font-bold text-start'>Chats</h2>
                <TemplChat>
                  {!isLoading ? (
                    sortedData.length ? (
                      sortedData.map((e: User) => {
                        const rtdbId = existenElementosSimilares(e.rtdb, user.rtdb as []);
                        const dataMessageUser = messages.find((item) => item.rtdb == rtdbId);
                        return (
                          <button
                            className={`w-full  rounded-md dark:text-primary ${
                              e.id.toString() === dataMensajeUser?.id
                                ? "bg-light text-primary"
                                : "bg-primary dark:bg-darkComponet hover:opacity-70"
                            } dark:transition-dark dark:shadow-dark  shadow-container `}
                            key={e.id}
                            onClick={() => {
                              setDataMensajeUser({
                                fullName: e.fullName,
                                img: e.img,
                                id: e.id.toString(),
                                rtdb: rtdbId as string,
                                status: "Enviado",
                                date: dataMessageUser?.date || new Date(),
                                lastChanged: dataMensajeUser?.lastChanged || "",
                              });
                              setOpenChatUserValue(rtdbId || "");
                            }}
                          >
                            <DivAllChat className='!gap-2'>
                              <FotoPerfil
                                img={e.img}
                                title={e.fullName}
                                className='w-[40px] h-[40px]'
                                connect={
                                  connected.find((eConnect: any) => e.id == eConnect.id)?.connect &&
                                  true
                                }
                              />

                              <div className='flex flex-col  overflow-hidden'>
                                <div className='flex gap-2 items-center'>
                                  {" "}
                                  <p className='m-0 text-start truncate '>{e.fullName}</p>
                                  {e.verification && <Verification publication={false} />}
                                </div>

                                {messagesWriting.find((item) => item.id == e.id)?.writing ? (
                                  <p className='text-[0.8rem] text-start text-green-600 m-0 p-0 animate-pulse '>
                                    Escribiendo...
                                  </p>
                                ) : (
                                  <p
                                    className={`text-[0.8rem] text-start truncate ${
                                      dataMessageUser?.id != user.id &&
                                      dataMessageUser?.id == e.id &&
                                      !dataMessageUser?.read
                                        ? "font-black"
                                        : Number(dataMensajeUser?.id) === e.id
                                        ? "text-gray-300 dark:text-gray-300"
                                        : "text-gray-600 dark:text-gray-300"
                                    }`}
                                  >
                                    {messages.find((item) => item.rtdb == rtdbId)?.id == user.id
                                      ? "Tú: "
                                      : null}
                                    {dataMessageUser?.message}
                                  </p>
                                )}
                              </div>
                              {dataMessageUser?.id != user.id && dataMessageUser?.id == e.id ? (
                                !dataMessageUser?.read ? (
                                  <SpanNoti>
                                    {messages.filter((user) => user.id == e.id).length}
                                  </SpanNoti>
                                ) : null
                              ) : null}
                            </DivAllChat>
                          </button>
                        );
                      })
                    ) : (
                      "Sin Chat"
                    )
                  ) : (
                    <LoaderRequest />
                  )}
                </TemplChat>
              </TemplMensaje>
            ) : null}
          </div>

          <div
            className={`w-3/4  max-md:w-full ${
              !dataMensajeUser?.id ? "block max-md:hidden" : " block"
            } h-[80vh]`}
          >
            {dataMensajeUser?.id ? (
              <TemplateChat
                isWriting={
                  messagesWriting.find((item) => item.id == Number(dataMensajeUser?.id))?.writing ||
                  false
                }
                connect={connected.find((eConnect) => Number(dataMensajeUser.id) == eConnect.id)}
                dataMensajeUser={dataMensajeUser}
                id={user.id}
                close={() => handleCloseChat()}
              />
            ) : (
              <div className='flex flex-col items-center justify-center h-full'>
                <div className='text-center p-8 bg-white dark:bg-darkComponet rounded-lg shadow-md max-w-md'>
                  <LuMessageSquare className='w-16 h-16 text-gray-400 dark:text-primary mx-auto mb-4' />
                  <h2 className='text-2xl font-semibold text-gray-800 dark:text-primary mb-2'>
                    No hay chat seleccionado
                  </h2>
                  <p className='text-gray-600 dark:text-gray-300'>
                    Selecciona una conversación de la lista a la izquierda para comenzar a chatear.
                    Aquí podrás ver el historial de mensajes y enviar nuevos mensajes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      ) : !sortedData?.length && !isLoading ? (
        <>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='text-center p-8 bg-white dark:bg-darkComponet rounded-lg shadow-md max-w-md'>
              <LuMessageSquare className='w-16 h-16 text-gray-400 dark:text-primary mx-auto mb-4' />
              <h2 className='text-2xl font-semibold text-gray-800 dark:text-primary mb-2'>
                ¿Aún no tienes conversaciones?
              </h2>
              <p className='text-gray-600 dark:text-gray-300'>
                Agrega amigos para comenzar a chatear y compartir momentos.
              </p>
              <Link
                href='/amigos'
                className='mt-5 inline-flex items-center px-6 py-3 bg-light text-primary font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:opacity-80'
              >
                <LuUsers className='mr-2' />
                Agregar amigos
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </DivTemMensaje>
  );
}

function existenElementosSimilares(array1: string[], array2: string[]) {
  return array1.find((elemento1) => {
    return array2.find((elemento2) => {
      return elemento1 === elemento2;
    });
  });
}
