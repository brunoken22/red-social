import {DivEnlaces, Button, Span} from './styled';
import Link from 'next/link';
import ConfigurateSvg from '@/ui/icons/configuration.svg';
import NightSvg from '@/ui/icons/night.svg';
import SunSvg from '@/ui/icons/sun.svg';
import CloseDoorSvg from '@/ui/icons/closeDoor.svg';
import FotoPerfil from '@/ui/FotoPerfil';
import {logOut} from '@/lib/hook';
import {useRouter} from 'next/navigation';

const className = 'text-center flex items-center gap-2';

export function Menu(props: any) {
  const {push} = useRouter();
  const handleClick = async () => {
    const logoutData = await logOut();
    props.closeSession();
    if (logoutData) {
      return push('/iniciarSesion');
    }
  };
  return (
    <div
      className='focus:border-[1px_solid_red] absolute right-0 '
      tabIndex={0}>
      <DivEnlaces>
        <Link
          href={'/perfil'}
          onClick={() => props.click(false)}
          className={className}>
          <FotoPerfil className='w-[20px] h-[20px]' img={props.userImg} />
          <Span> {props.userName}</Span>
        </Link>
        {props.theme == 'false' ? (
          <button
            onClick={() => props.themebutton('true')}
            className={className}>
            <NightSvg className='fill-black' />
            modo oscuro
          </button>
        ) : (
          <button
            onClick={() => props.themebutton('false')}
            className={className}>
            <SunSvg className=' fill-[#ffe289]' />
            modo claro
          </button>
        )}
        <Link
          href={'/configuracion'}
          onClick={() => props.click(false)}
          className={className}>
          <ConfigurateSvg className='fill-black dark:fill-white' />
          <Span> Configuracion</Span>
        </Link>

        <Button onClick={handleClick}>
          <CloseDoorSvg className='fill-black dark:fill-white stroke-black dark:stroke-white' />
          <Span>Cerrar Sesion </Span>
        </Button>
      </DivEnlaces>
    </div>
  );
}
