'use client';
import {ButtonNoti} from '@/ui/boton';
import {DivPublicar} from '@/ui/container';
import {FotoPerfil} from '@/ui/FotoPerfil';
export function TemNoti() {
  return (
    <DivPublicar>
      {[1, 2, 3, 4]
        ? [1, 2, 3, 4].map((e: any, p: any) => (
            <ButtonNoti key={p}>
              {/* <FotoPerfil /> */}
              <p>Nueva publicacion de Allison Lucia</p>
            </ButtonNoti>
          ))
        : 'Sin notificaciones'}
    </DivPublicar>
  );
}
