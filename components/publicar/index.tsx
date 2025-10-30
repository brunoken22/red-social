"use client";
import dynamic from "next/dynamic";
import { DivPublicar } from "@/ui/container";
import { DivSubir, DivASubir, DivText, DivCrear } from "./styled";
import { useEffect, useState } from "react";
import { SkeletonPlicate } from "@/ui/skeleton";
import { FiImage, FiVideo, FiEdit3 } from "react-icons/fi";
import { useIsConnected, useUser } from "@/lib/store";

const NotificationToastStatus = dynamic(() =>
  import("@/ui/toast").then((mod) => mod.NotificationToastStatus)
);
const Body = dynamic(() => import("@/ui/typography").then((mod) => mod.Body));
const TemplateFormPublicar = dynamic(() => import("./templateFormPublicate"));
const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"));

export default function Publicar() {
  const [formClick, setFormClick] = useState(false);
  const { user, isLoading } = useUser();
  const connected = useIsConnected((state) => state.connected);
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

  return !isLoading ? (
    <>
      <DivPublicar className='w-full max-w-full'>
        <DivText>
          <FotoPerfil
            title={user.fullName}
            img={user?.img}
            className='w-[40px] h-[40px]'
            connect={connected.find((e: any) => e.id == user?.id)?.connect && true}
          />
          <DivCrear onClick={() => setFormClick(true)}>
            <div className='flex items-center gap-2'>
              <FiEdit3 className='text-gray-500' />
              <p>Crear publicación</p>
            </div>
          </DivCrear>
        </DivText>
        <DivSubir>
          <DivASubir onClick={() => setFormClick(true)}>
            <FiImage className='text-green-500 text-lg' size={24} />
            <Body className='text-sm'>Foto</Body>
          </DivASubir>

          {formClick ? (
            <TemplateFormPublicar
              fullName={user.fullName}
              image={user.img}
              verification={user.verification}
              close={() => setFormClick(false)}
            />
          ) : null}

          <DivASubir onClick={() => setFormClick(true)}>
            <FiVideo className='text-red-500 text-lg' size={24} />
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
