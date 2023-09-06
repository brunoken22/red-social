import {Metadata} from 'next';
import {PerfilAmigo} from '@/components/perfilUser';
import {Main} from '@/ui/container';
export const metadata: Metadata = {
  title: 'Amigo | UniRed',
};
export default function Perfil() {
  return <Main><PerfilAmigo/></Main>;
}
