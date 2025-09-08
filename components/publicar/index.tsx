"use client";
import dynamic from "next/dynamic";
import { DivPublicar } from "@/ui/container";
import { useRecoilValue } from "recoil";
import { DivSubir, DivASubir, DivText, DivCrear } from "./styled";
import { useEffect, useState } from "react";
import { user, isConnect } from "@/lib/atom";
import { SkeletonPlicate } from "@/ui/skeleton";

const NotificationToastStatus = dynamic(() =>
  import("@/ui/toast").then((mod) => mod.NotificationToastStatus)
);
const Body = dynamic(() => import("@/ui/typography").then((mod) => mod.Body));
const TemplateFormPublicar = dynamic(() => import("./templateFormPublicate"));
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));

export default function Publicar() {
  const [formClick, setFormClick] = useState(false);
  const dataValor = useRecoilValue(user);
  const dataIsConnect = useRecoilValue(isConnect);
  const [alert, setAlert] = useState<
    { message: string; status: "success" | "error" | "info" | "warning" } | false
  >(false);

  useEffect(() => {
    if (formClick) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [formClick]);

  return dataValor.user.id ? (
    <>
      <DivPublicar className=' w-full max-w-full'>
        <DivText>
          <FotoPerfil
            title={dataValor.user.fullName}
            img={dataValor?.user?.img}
            className='w-[40px] h-[40px]'
            connect={dataIsConnect?.find((e: any) => e.id == dataValor?.user?.id)?.connect && true}
          />
          <DivCrear onClick={() => setFormClick(true)}>
            <p>Crear publicacion</p>
          </DivCrear>
        </DivText>
        <DivSubir>
          <DivASubir onClick={() => setFormClick(true)}>
            <img src='/icons/image.svg' alt='Foto' title='Foto' />{" "}
            <Body className='text-sm'>Foto</Body>
          </DivASubir>
          {formClick ? (
            <TemplateFormPublicar
              fullName={dataValor.user.fullName}
              image={dataValor.user.img}
              verification={dataValor.user.verification}
              close={() => setFormClick(false)}
            />
          ) : null}
          <DivASubir onClick={() => setFormClick(true)}>
            <img src='/icons/video.svg' alt='Video' title='Video' />
            <Body className='text-sm'>Video</Body>
          </DivASubir>
        </DivSubir>
      </DivPublicar>
      {alert && (
        <NotificationToastStatus
          message={alert.message}
          status={alert.status}
          close={() => setAlert(false)}
        />
      )}
    </>
  ) : (
    <SkeletonPlicate />
  );
}
