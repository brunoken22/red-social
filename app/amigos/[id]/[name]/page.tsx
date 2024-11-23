import { PerfilAmigo } from '@/components/perfilAmigo';
import { Main } from '@/ui/container';

export default function UsuarioId({ params }: { params: { name: string } }) {
  return (
    <>
      <title>{decodeURIComponent(params.name) + ' | UniRed '}</title>
      <meta property='og:title' content='Mi Página Especial' />
      <meta property='og:description' content='Descripción única de mi página especial.' />
      <meta property='og:image' content='https://example.com/imagen-unica.jpg' />
      <meta property='og:url' content='https://example.com/mipagina' />
      <meta property='og:type' content='website' />
      <Main>
        <PerfilAmigo />
      </Main>
    </>
  );
}
