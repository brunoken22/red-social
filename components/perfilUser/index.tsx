import {FotoPerfil} from '@/ui/FotoPerfil';
import {
  DivPerfilUser,
  DivHeadPerfil,
  DivFotoName,
  DivButton,
  DivPublicaciones,
} from './styled';
import {ButtonAgregar} from '@/ui/boton';
import {Publicar} from '../publicar';
import {Publicaciones} from '../publicaciones';
export function PerfilUser() {
  return (
    <DivPerfilUser>
      <DivHeadPerfil>
        <DivFotoName>
          <FotoPerfil wid='80' hei='80' />
          <h2>Bruno Ken</h2>
        </DivFotoName>
        <DivButton>
          <ButtonAgregar>Editar perfil</ButtonAgregar>
        </DivButton>
      </DivHeadPerfil>

      <DivPublicaciones>
        <Publicar />
        <Publicaciones />
      </DivPublicaciones>
    </DivPerfilUser>
  );
}
