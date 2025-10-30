"use client";
import { DivConfiguracionPerfil, DIvCongifurar } from "./styled";
import { ButtonNoti } from "@/ui/boton";
import { useState } from "react";
import { EmailYName } from "../conEmailName";
import { Password } from "../conPassword";
import VerificationUser from "../verificationUser";
import { useUser } from "@/lib/store";

type ButtonType = "ue" | "co" | "sv";

export function ConfigPerfil() {
  const user = useUser((state) => state.user);
  const [conEmailName, setConEmailName] = useState<ButtonType>("ue");
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
        max-md:gap-2'
        >
          <ButtonNoti
            onClick={handleClick}
            className={conEmailName == "ue" ? "w-auto bg-light text-primary" : "w-auto"}
            id='ue'
          >
            Cambiar nombre usuario y email
          </ButtonNoti>
          {!user.google && (
            <ButtonNoti
              onClick={handleClick}
              id='co'
              className={conEmailName == "co" ? "w-auto bg-light text-primary" : "w-auto"}
            >
              Cambiar contraseña
            </ButtonNoti>
          )}
          <ButtonNoti
            onClick={handleClick}
            id='sv'
            className={conEmailName == "sv" ? "w-auto bg-light text-primary" : "w-auto"}
          >
            Solicitar Verificación
          </ButtonNoti>
        </div>
      </div>
      <DIvCongifurar>
        {conEmailName == "ue" ? <EmailYName fullName={user.fullName} email={user.email} /> : null}
        {conEmailName == "co" ? <Password /> : null}
        {conEmailName == "sv" ? (
          <VerificationUser email={user.email} verification={user.verification} />
        ) : null}
      </DIvCongifurar>
    </DivConfiguracionPerfil>
  );
}
