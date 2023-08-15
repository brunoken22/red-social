'use client';
import {Span} from '@/components/span';
import {ContainerMain, DivMain} from '@/ui/container';
import {TemAmigos} from '@/components/templateAmigos';
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
