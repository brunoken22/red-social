import {DivMain, ContainerMain} from '@/ui/container';
import {TemplateNotifiId} from '@/components/templateNotificacion';
import {Span} from '@/components/span';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Notificaciones | UniRed',
};
export default function Notificaciones() {
  return (
    <DivMain>
      <ContainerMain>
        <TemplateNotifiId></TemplateNotifiId>
      </ContainerMain>
    </DivMain>
  );
}
