import {DivMenu, DivEnlaces, Button, Span} from './styled';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const enla: any = {
  color: '#ddd',
  textDecoration: 'none',
  textAlign: 'center',
};
export function Menu(props: any) {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault();
    props.click(false);
    const url = e.currentTarget.getAttribute('href');
    router.push(url);
  };
  const handleCerrarSesion = (e: any) => {
    e.preventDefault();
    localStorage.removeItem('token');
    location.href = process.env.NEXT_PUBLIC_PORT as string;
  };
  return (
    <DivMenu>
      <DivEnlaces>
        <Link href={'/perfil'} onClick={handleClick} style={enla}>
          <Span> Perfil</Span>
        </Link>
        <Link href={'/configuracion'} onClick={handleClick} style={enla}>
          <Span> Configuracion</Span>
        </Link>
        <Button onClick={handleCerrarSesion}>
          <Span>Cerrar Sesion </Span>
        </Button>
      </DivEnlaces>
    </DivMenu>
  );
}
