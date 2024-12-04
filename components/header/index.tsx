'use client';
import dynamic from 'next/dynamic';
import { ref, onValue, update } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import './style.css';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { GetUser, NotificacionesUser, useConnectionStatus } from '@/lib/hook';
// import { useGlobalAudioPlayer, useAudioPlayer } from 'react-use-audio-player';
import Link from 'next/link';
import { Menu } from '@/components/menu';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  user,
  getAllSolicitudesRecibidas,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  // getAllUser,
} from '@/lib/atom';
import Logo from '@/public/logo.svg';
import { useDebouncedCallback } from 'use-debounce';
import { LoaderRequest } from '../loader';
import { SkeletonNav } from '@/ui/skeleton';

const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'), {
  loading: () => <LoaderRequest />,
});

const DivConectados = dynamic(() => import('./styled').then((mod) => mod.DivConectados), {
  loading: () => <LoaderRequest />,
});

const DivConnect = dynamic(() => import('./styled').then((mod) => mod.DivConnect), {
  loading: () => <LoaderRequest />,
});

const DivContenedorConnect = dynamic(() => import('./styled').then((mod) => mod.DivContenedorConnect), {
  loading: () => <LoaderRequest />,
});
const SearchUser = dynamic(() => import('../searchUsers').then((mod) => mod.SearchUser));
const SearchBox = dynamic(() => import('react-instantsearch').then((mod) => mod.SearchBox));
const ConnectedUsers = dynamic(() => import('./connectedUser'));
const NavegationUrl = dynamic(() => import('./navHeader'));

export default function Header({ themeDate }: { themeDate: string }) {
  GetUser();
  NotificacionesUser(0);

  const pathname = usePathname();
  const dataUser = useRecoilValue(user);
  // const getAllUserData = useRecoilValue(getAllUser);
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const [dataIsConnect, setIsConnect] = useRecoilState(isConnect);
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  // const [notificationSound, setNotificationSound] = useState<any[]>([]);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const [allConnectAmigos, setAllConnectAmigos] = useState([]);
  const [connectAmigos, setConnectAmigos] = useState(false);
  const [menu, setMenu] = useState(false);
  const [theme, setThemes] = useState<string>(themeDate);
  const [openNav, setOpenNav] = useState(true);
  const lastScrollY = useRef(0);
  const useDebounce = useDebouncedCallback((query, search) => {
    search(query);
  }, 1000);
  useConnectionStatus(dataUser.user);

  useEffect(() => {
    const cookieResponse = async () => {
      const setCookie = await import('cookies-next').then((mod) => mod.setCookie);
      setCookie('theme', theme);
      if (theme !== 'true') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    };
    cookieResponse();
  }, [theme]);

  // useEffect(() => {
  //   if (notificacionesUserAtom.length) {
  //     const newNotificationSound = notificacionesUserAtom.filter((item) => {
  //       load('/notification.mp3', {autoplay: true});
  //       return {
  //         ...item,
  //         notification: false,
  //       };
  //     });
  //     setNotificationSound(newNotificationSound);
  //   }
  // }, [notificacionesUserAtom]);
  // useEffect(() => {
  //   if (notificationSound.length) {
  //     const newNoti = notificationSound.map((item) => {
  //       load('/notification.mp3', {autoplay: true});
  //       return {
  //         ...item,
  //         notification: true,
  //       };
  //     });
  //     setNotificationSound(newNoti);
  //   }
  // }, [notificationSound]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    const audio = new Audio('/notification.mp3');
    audio.load();
    dataUser.user.rtdb.map((item) => {
      const chatrooms = ref(rtdb, '/rooms/' + item + '/messages');

      return onValue(chatrooms, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const datas = Object.values(valor);
          const ultimoMensaje: any = datas[datas.length - 1];

          if (ultimoMensaje.status === 'Enviado' && ultimoMensaje.id !== dataUser.user.id) {
            const keys = Object.keys(valor);
            const lastKey = keys[keys.length - 1];
            const mensajeRef = ref(rtdb, `/rooms/${item}/messages/${lastKey}`);

            audio
              .play()
              .then(() => update(mensajeRef, { status: 'Recibido' }))
              .catch(() => update(mensajeRef, { status: 'Recibido' }));
          }

          // Actualizar el estado de los mensajes en la aplicación
          setDataMessage((prev) => {
            if (prev.length) {
              const findMessageRtdbEqual = prev.find((message) => message.rtdb === item);
              if (findMessageRtdbEqual) {
                return prev.map((message) =>
                  message.rtdb === item
                    ? {
                        ...ultimoMensaje,
                        rtdb: item,
                      }
                    : message
                );
              } else {
                return [...prev, { ...ultimoMensaje, rtdb: item }];
              }
            } else {
              // Si no hay elementos previos, devuelve un array nuevo con el primer mensaje
              return [{ ...ultimoMensaje, rtdb: item }];
            }
          });
        }
      });
    });

    return () => {
      if (!dataUser?.user?.id) return;
    };
  }, [dataUser?.user?.rtdb]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    const connectRef = ref(rtdb, '/connect');
    onValue(connectRef, async (snapshot: any) => {
      const valor = snapshot.val();
      if (valor) {
        const dataConnect: any = Object.values(valor);
        setIsConnect(dataConnect);
        const connecam = dataConnect.filter((e: Connect) => {
          return e.id != Number(dataUser.user.id) && e.connect && dataUser.user.amigos.includes(e.id);
        });
        setAllConnectAmigos(connecam);
      }
    });
  }, [dataUser?.user?.id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);
    if (scrollDifference >= 60) {
      if (currentScrollY > lastScrollY.current) {
        setOpenNav(false);
      } else {
        setOpenNav(true);
      }
      lastScrollY.current = currentScrollY;
    }
  };
  const modalRef = useRef<HTMLDivElement>(null); // Referencia al modal para saber si el clic ocurrió dentro o fuera

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return dataUser?.user?.id ? (
    <>
      <header
        className={`${
          openNav ? 'translate-y-0' : 'max-md:-translate-y-full'
        } p-2 sticky top-0 right-0 left-0 z-10 bg-primary transition-transform duration-300 dark:bg-darkComponet`}>
        <nav className='flex justify-between items-center max-md:justify-between max-w-[850px] m-auto'>
          <div className='flex gap-4 items-center '>
            <Link href={'/inicio'} aria-label='home'>
              <Logo className='rounded-md fill-unired transition-dark' />
            </Link>
            <div className='border-none relative max-md:hidden '>
              {pathname !== '/search' && <SearchBox aria-label='searchAlgolia' id='searchAlgolia' placeholder='UniRed' queryHook={useDebounce} />}
              <SearchUser />
            </div>
          </div>
          <NavegationUrl
            amigos={dataSoliReci?.length}
            message={dataMessage.filter((message) => !message.read && message.id != dataUser.user.id).length}
            notification={notificacionesUserAtom?.newPubliOPen}
          />
          <div className='relative ' ref={modalRef}>
            <button onClick={() => setMenu((isMenu) => !isMenu)} className='m-0 bg-transparent border-none relative z-50'>
              <FotoPerfil
                className='w-[40px] h-[40px] hover:border-2 hover:opacity-70'
                img={dataUser.user.img}
                connect={dataIsConnect?.find((e: any) => e.id == dataUser.user?.id) && true}
              />
            </button>
            {menu ? (
              <Menu
                theme={theme}
                themebutton={(data: string) => setThemes(data)}
                click={(data: boolean) => setMenu(data)}
                userImg={dataUser.user.img}
                userName={dataUser.user.fullName.split(' ')[0]}
              />
            ) : null}
          </div>
        </nav>
      </header>
      <DivContenedorConnect>
        <DivConectados onClick={() => setConnectAmigos(!connectAmigos)}>
          <span>Conectados</span> <DivConnect />
        </DivConectados>
        {connectAmigos ? <ConnectedUsers allConnectAmigos={allConnectAmigos} dataIsConnect={dataIsConnect} /> : null}
      </DivContenedorConnect>
    </>
  ) : (
    <SkeletonNav />
  );
}
