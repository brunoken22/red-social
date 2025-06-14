import { DivMain, ContainerMain } from '@/ui/container';
import TemplateNotifiId from '@/components/templateNotificacion/notificationId';
import { Span } from '@/components/span';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Notificaciones | UniRed',
  description: 'Notificaciones de usuri@',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
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
