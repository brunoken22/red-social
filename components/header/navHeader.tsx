import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Home from '@/ui/icons/home.svg';
import Amigos from '@/ui/icons/amigos.svg';
import Chat from '@/ui/icons/chat.svg';
import Notificaciones from '@/ui/icons/notificaciones.svg';
import Search from '@/ui/icons/search.svg';
import { DivNotificacionActi } from './styled';
export default function NavegationUrl({
  amigos,
  message,
  notification,
}: {
  amigos: number;
  message: number;
  notification: number | undefined;
}) {
  const pathname = usePathname();
  const className = 'relative';
  const isOpen = 'p-2 bg-light rounded-full';
  return (
    <div className='flex justify-evenly items-center gap-8 max-md:gap-4'>
      <Link href={'/search'} aria-label='search'>
        <span className={`hidden  max-md:block ${pathname == '/search' ? isOpen : ''} `}>
          <Search
            className={`${
              pathname == '/search'
                ? 'fill-white w-[20px] h-[20px]'
                : 'hover:opacity-70 dark:fill-gray-200 fill-gray-600 '
            }`}
          />
        </span>
      </Link>
      <Link
        href={'/inicio'}
        aria-label='home'
        className={`${pathname == '/inicio' ? isOpen : ''} ${className}`}>
        <span>
          <Home
            className={`${
              pathname == '/inicio'
                ? 'fill-white w-[20px] h-[20px]'
                : 'hover:opacity-70 dark:fill-gray-200 fill-gray-600 '
            }`}
          />
        </span>
      </Link>
      <Link
        href={'/amigos'}
        aria-label='amigos'
        className={`${pathname == '/amigos' ? isOpen : ''} ${className}`}>
        {amigos ? <DivNotificacionActi>{amigos}</DivNotificacionActi> : null}
        <span>
          <Amigos
            className={`${
              pathname == '/amigos'
                ? ' fill-white  w-[20px] h-[20px]'
                : 'hover:opacity-70 dark:fill-gray-200 fill-gray-600'
            }`}
          />
        </span>
      </Link>
      <Link
        href={'/chat'}
        aria-label='mensaje'
        className={`${pathname == '/chat' ? isOpen : ''} ${className}`}>
        {message > 0 && <DivNotificacionActi>{message}</DivNotificacionActi>}
        <span>
          <Chat
            className={`${
              pathname == '/chat'
                ? 'fill-white w-[20px] h-[20px]'
                : 'hover:opacity-70 dark:fill-gray-200 fill-gray-600 '
            }`}
          />{' '}
        </span>
      </Link>
      <Link
        href={'/notificaciones'}
        aria-label='notificaciones'
        className={`${pathname == '/notificaciones' ? isOpen : ''} ${className}`}>
        {notification ? <DivNotificacionActi>{notification}</DivNotificacionActi> : null}
        <span>
          <Notificaciones
            className={`${
              pathname == '/notificaciones'
                ? 'fill-white  w-[20px] h-[20px]'
                : 'hover:opacity-70 dark:fill-gray-200 fill-gray-600 '
            }`}
          />{' '}
        </span>
      </Link>
    </div>
  );
}
