import {PerfilAmigo} from '@/components/perfilAmigo';
import {Main} from '@/ui/container';

export default function UsuarioId({params}: {params: {name: string}}) {
  return (
    <>
      <head>
        <title>{decodeURIComponent(params.name) + ' | UniRed '}</title>
      </head>
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
