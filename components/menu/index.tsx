import {DivMenu, DivEnlaces, Button} from './styled';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const enla: any = {
  color: '#fff',
  textDecoration: 'none',
  textAlign: 'center',
};
export function Menu(props: any) {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault();
    props.click(false);
    router.push((e as any).target.href);
  };
  return (
    <DivMenu>
      <DivEnlaces>
        <Link href={'/perfil'} onClick={handleClick} style={enla}>
          Perfil
        </Link>
        <Link href={'/configuracion'} onClick={handleClick} style={enla}>
          Configuracion
        </Link>
        <Button>Cerrar Cerrsion</Button>
      </DivEnlaces>
    </DivMenu>
  );
}
