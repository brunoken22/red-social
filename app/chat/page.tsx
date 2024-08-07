import {TemMensaje} from '@/components/templateMensaje';
import {DivMain} from '@/ui/container';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Chat | UniRed',
  description: 'Chat',
};
export default function Mensaje() {
  return (
    <DivMain>
      <TemMensaje></TemMensaje>
    </DivMain>
  );
}
