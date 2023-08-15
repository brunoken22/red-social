'use client';

import {DivMain, ContainerMain} from '@/ui/container';
import {TemNoti} from '@/components/templateNotificacion';
import {Span} from '@/components/span';

export default function Notificaciones() {
  return (
    <DivMain>
      <ContainerMain>
        <TemNoti />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
