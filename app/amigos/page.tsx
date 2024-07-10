import {Span} from '@/components/span';
import {ContainerMain, DivMain} from '@/ui/container';
import AmigosComponent from '@/components/friendRequest';
import {Metadata} from 'next';
export const metadata: Metadata = {
  title: 'Amigos | UniRed',
  description: 'Amigos',
};
export default function Amigos() {
  return (
    <DivMain>
      <ContainerMain>
        <AmigosComponent />
        <Span />
      </ContainerMain>
    </DivMain>
  );
}
