"use client";
import dynamic from "next/dynamic";
import { ButtonAgregar } from "@/ui/boton";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { HandleActionsFriend } from "../friendRequest";

const LoaderRequest = dynamic(() => import("../loader").then((mod) => mod.LoaderRequest));

const DivAllAmistades = dynamic(() => import("@/ui/container").then((mod) => mod.DivAllAmistades));

export default function TemplateFriendRequest({
  id,
  fullName,
  img,
  requestClassDuo,
  typeRequest,
  handleSolicitudEnv,
  handleSolicitudAcep,
  handleSolicitudRecha,
  handleEliminarAmigo,
}: {
  id: number;
  fullName: string;
  img: string;
  requestClassDuo: boolean;
  typeRequest: "suggestion" | "requestFriend" | "allFriend" | "requestSent";
  handleSolicitudEnv: ({ id, setIsLoading }: HandleActionsFriend) => void;
  handleSolicitudAcep: ({ id, setIsLoading }: HandleActionsFriend) => void;
  handleSolicitudRecha: ({ id, setIsLoading }: HandleActionsFriend) => void;
  handleEliminarAmigo: ({ id, setIsLoading }: HandleActionsFriend) => void;
}) {
  const [isLoading, setIsLoading] = useState<string | false>(false);

  return (
    <DivAllAmistades requestClassDuo={requestClassDuo}>
      <Link
        href={"/amigos/" + id}
        className='h-full hover:opacity-60 max-md:m-auto max-sm:h-[120px] max-sm:w-[120px]  bg-hoverPrimary w-full   max-sm:rounded-full max-sm:overflow-hidden'
      >
        {img ? (
          <img
            src={img}
            alt={fullName}
            className='object-cover w-full h-full   max-sm:overflow-hidden'
            loading='lazy'
          />
        ) : (
          <div className='h-full flex justify-center items-end'>
            <FaUser size={"80%"} color='gray' />
          </div>
        )}
      </Link>
      <div className='p-2 h-full w-[inherit] max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:justify-center max-md:max-w-[320px] max-md:min-w-full'>
        <Link
          href={"/amigos/" + id}
          className='p-2 font-semibold hover:opacity-60 block whitespace-nowrap	max-md:text-start truncate'
        >
          {fullName}
        </Link>
        <div className='flex flex-col max-sm:flex-row justify-center gap-2'>
          {!isLoading ? (
            <>
              {typeRequest == "suggestion" ? (
                <ButtonAgregar
                  id={id}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSolicitudEnv({ id: e.currentTarget.id, setIsLoading })
                  }
                  bg={"blue"}
                >
                  Añadir amigo
                </ButtonAgregar>
              ) : null}
              {typeRequest == "requestFriend" ? (
                <>
                  <ButtonAgregar
                    id={id}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleSolicitudAcep({ id: e.currentTarget.id, setIsLoading })
                    }
                  >
                    Aceptar{" "}
                  </ButtonAgregar>
                  <ButtonAgregar
                    id={id}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleSolicitudRecha({ id: e.currentTarget.id, setIsLoading })
                    }
                    bg='red'
                  >
                    Rechazar
                  </ButtonAgregar>
                </>
              ) : null}
              {typeRequest == "allFriend" ? (
                <ButtonAgregar
                  id={id}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleEliminarAmigo({ id: e.currentTarget.id, setIsLoading })
                  }
                  bg={"red"}
                >
                  Eliminar amigo
                </ButtonAgregar>
              ) : null}
              {typeRequest == "requestSent" ? (
                <ButtonAgregar
                  id={id}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSolicitudRecha({ id: e.currentTarget.id, setIsLoading })
                  }
                  bg={"red"}
                >
                  Cancelar solicitud
                </ButtonAgregar>
              ) : null}
            </>
          ) : (
            <div className='flex items-center justify-center'>
              <LoaderRequest />
            </div>
          )}
        </div>
      </div>
    </DivAllAmistades>
  );
}
