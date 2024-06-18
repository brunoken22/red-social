import {DivEnlaces, Button, Span} from './styled';
import Link from 'next/link';
import {useEffect, useRef, useState} from 'react';
import ConfigurateSvg from '@/ui/icons/configuration.svg';
import NightSvg from '@/ui/icons/night.svg';
import CloseDoorSvg from '@/ui/icons/closeDoor.svg';
import FotoPerfil from '@/ui/FotoPerfil';
import {logOut} from '@/lib/hook';

const className = 'text-center flex items-center gap-2';

export function Menu(props: any) {
  const themeValue =
    typeof window !== undefined ? localStorage.getItem('theme') : false;
  const enlaces: any = useRef(null);
  const [theme, setThemes] = useState<boolean>(
    (themeValue && JSON.parse(themeValue)) || false
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem('theme', JSON.stringify(theme));
    }
    if (theme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // console.log(enlaces);
    if (enlaces?.current) {
      enlaces.current.focus();
      // console.log(enlaces.current);
    }
  }, [enlaces]);

  const handleClick = async () => {
    const logoutData = await logOut();
    // if (logoutData) {
    //   return window.location.assign(window.location.origin + '/signin');
    // }
  };
  const handleBlur = () => {
    // console.log('salistes del focus');
    // if (focus) {
    setTimeout(() => {
      // console.log('settimeout');
      props.click(false);
    }, 10000);
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
        <button onClick={() => setThemes(!theme)} className={className}>
          <NightSvg className='fill-black dark:fill-white' />
          modo dark
        </button>
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
