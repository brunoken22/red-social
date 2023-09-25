import {DivMain, ContainerMain} from '@/ui/container';
import {TemNoti} from '@/components/templateNotificacion';
import {Span} from '@/components/span';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Notificaciones | UniRed',
  description: 'Notificaciones',
};
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
