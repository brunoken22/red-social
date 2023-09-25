import {DivMain, ContainerMain} from '@/ui/container';
import {TemplateNotifiId} from '@/components/templateNotificacion';
import {Span} from '@/components/span';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Notificaciones | UniRed',
  description: 'Notificaciones de usuri@',
};
export default function Notificaciones() {
  return (
    <DivMain>
      <ContainerMain>
        <TemplateNotifiId></TemplateNotifiId>
        <Span></Span>
      </ContainerMain>
    </DivMain>
  );
}
