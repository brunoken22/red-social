'use client';
import {Metadata} from 'next';
import {PerfilUser} from '@/components/perfilUser';
import {Main, DivPublicaciones, ContainerMain} from '@/ui/container';

export const metadata: Metadata = {
  title: 'Perfil | UniRed',
};
export default function Perfil() {
  return (
    <Main>
      <PerfilUser />
    </Main>
  );
}
