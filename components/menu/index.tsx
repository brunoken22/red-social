import {DivEnlaces, Button, Span} from './styled';
import Link from 'next/link';
import {useEffect, useRef} from 'react';
import ConfigurateSvg from '@/ui/icons/configuration.svg';
import NightSvg from '@/ui/icons/night.svg';
import SunSvg from '@/ui/icons/sun.svg';
import CloseDoorSvg from '@/ui/icons/closeDoor.svg';
import FotoPerfil from '@/ui/FotoPerfil';
import {logOut} from '@/lib/hook';

const className = 'text-center flex items-center gap-2';

export function Menu(props: any) {
  const enlaces: any = useRef(null);

  useEffect(() => {
    // console.log(enlaces);
    if (enlaces?.current) {
      enlaces.current.focus();
      // console.log(enlaces.current);
    }
  }, [enlaces]);

  const handleClick = async () => {
    const logoutData = await logOut();
    if (logoutData) {
      window.location.href = window.location.origin + '/signin';
    }
  };
  const handleBlur = () => {
    // console.log('salistes del focus');
    // if (focus) {
    // setTimeout(() => {
    // console.log('settimeout');
    // props.click(false);
    // }, 10000);
    // }
  };

  return (
    <div
      className='focus:border-[1px_solid_red] absolute right-0 '
      ref={enlaces}
      tabIndex={0}
      onBlur={handleBlur}>
      <DivEnlaces>
        <Link
          href={'/perfil'}
          onClick={() => props.click(false)}
          className={className}>
          <FotoPerfil className='w-[20px] h-[20px]' img={props.userImg} />
          <Span> {props.userName}</Span>
        </Link>
        {!props.theme ? (
          <button
            onClick={() => props.themebutton(!props.theme)}
            className={className}>
            <NightSvg className='fill-black' />
            modo oscuro
          </button>
        ) : (
          <button
            onClick={() => props.themebutton(!props.theme)}
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
