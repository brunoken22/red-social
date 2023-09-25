import {Span} from '@/components/span';
import {ContainerMain, DivMain} from '@/ui/container';
import {TemAmigos} from '@/components/templateAmigos';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Amigos | UniRed',
  description: 'Amigos',
};
export default function Amigos() {
  return (
    <DivMain>
      <ContainerMain>
        <TemAmigos />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
