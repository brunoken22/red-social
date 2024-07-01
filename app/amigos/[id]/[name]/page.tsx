import {PerfilAmigo} from '@/components/perfilAmigo';
import {Main} from '@/ui/container';

export default function UsuarioId({params}: {params: {name: string}}) {
  // console.log('hola', params);
  return (
    <>
      <head>
        <title>{decodeURIComponent(params.name) + ' | UniRed '}</title>
      </head>
      <Main>
        <PerfilAmigo />
      </Main>
      <h2>wdadsa</h2>
    </>
  );
}
