import {TemMensaje} from '@/components/templateMensaje';
import {DivMain} from '@/ui/container';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Mensajes | UniRed',
  description: 'Mensajes',
};
export default function Mensaje() {
  return (
    <DivMain>
      <TemMensaje></TemMensaje>
    </DivMain>
  );
}
