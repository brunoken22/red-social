import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Amigos | UniRed',
//   description: 'Amigos',
// };

export default function () {
  return (
    <>
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
