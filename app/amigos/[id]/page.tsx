import {Metadata} from 'next';
import {PerfilAmigo} from '@/components/perfilAmigo';
import {Main} from '@/ui/container';

export const metadata: Metadata = {
  title: 'Amigo | UniRed',
  description: 'Amig@s del usuario',
};
export default function Page() {
  return (
    <Main>
      <PerfilAmigo />
    </Main>
  );
}
