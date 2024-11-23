import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';

export default function UsuarioId({ params }: { params: { name: string } }) {
  return (
    <>
      <title>{decodeURIComponent(params.name) + ' | UniRed '}</title>
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
