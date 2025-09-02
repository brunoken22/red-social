import { DivEnlaces, Button, Span } from "./styled";
import Link from "next/link";
import FotoPerfil from "@/ui/FotoPerfil";
import { logOut } from "@/lib/hook";
import { IoMdInformationCircle } from "react-icons/io";
import { MdLogout, MdOutlineNightlight } from "react-icons/md";
import { GrConfigure } from "react-icons/gr";
import { GoSun } from "react-icons/go";
import { signOut } from "next-auth/react";

const className = "text-center flex items-center gap-2 hover:opacity-70 py-2 px-1";

export function Menu(props: any) {
  const handleSignOut = async () => {
    await logOut();
    await signOut();
  };

  return (
    <div className='focus:border-[1px_solid_red] absolute right-0 '>
      <div>
        <DivEnlaces>
          <Link
            href={"/perfil"}
            onClick={() => props.click(false)}
            className={`${className} ${props.pathname == "/perfil" ? "bg-light text-primary" : ""}`}
          >
            <FotoPerfil className='w-[20px] h-[20px]' img={props.userImg} title={props.userName} />
            <Span> {props.userName}</Span>
          </Link>
          {props.theme == "false" ? (
            <button onClick={() => props.themebutton("true")} className={`${className}`}>
              <MdOutlineNightlight className='text-xl text-light' />
              modo oscuro
            </button>
          ) : (
            <button onClick={() => props.themebutton("false")} className={`${className} `}>
              <GoSun className='text-xl fill-[#ffe289]' />
              modo claro
            </button>
          )}
          <Link
            href={"/configuracion"}
            onClick={() => props.click(false)}
            className={`${className} ${
              props.pathname == "/configuracion" ? "bg-light text-primary" : ""
            }`}
          >
            <GrConfigure className='fill-black text-xl dark:fill-white' />
            <Span> Configuracion</Span>
          </Link>
          <Link
            href={"/contacto"}
            onClick={() => props.click(false)}
            className={`${className} ${
              props.pathname == "/contacto" ? "bg-light text-primary" : ""
            }`}
          >
            <IoMdInformationCircle className='fill-black text-xl dark:fill-white' />
            <Span> Contacto</Span>
          </Link>
          <Button onClick={handleSignOut} className={className}>
            <MdLogout className='fill-black dark:fill-white  text-xl' />
            <Span>Cerrar Sesion </Span>
          </Button>
        </DivEnlaces>
      </div>
    </div>
  );
}
