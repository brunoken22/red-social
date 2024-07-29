'use client';
import dynamic from 'next/dynamic';
import {
  ref,
  onValue,
  update,
  goOffline,
  goOnline,
  onDisconnect,
} from 'firebase/database';
import {rtdb} from '@/lib/firebase';
import './style.css';
import {usePathname} from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';
import {GetUser, NotificacionesUser} from '@/lib/hook';
// import {useGlobalAudioPlayer} from 'react-use-audio-player';
import Link from 'next/link';
import {Menu} from '@/components/menu';
import {useRecoilValue, useRecoilState} from 'recoil';
import {
  user,
  getAllSolicitudesRecibidas,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  getAllUser,
} from '@/lib/atom';
import Logo from '@/public/logo.svg';
import {useDebouncedCallback} from 'use-debounce';
const SkeletonNav = dynamic(() =>
  import('@/ui/skeleton').then((mod) => mod.SkeletonNav)
);
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

const DivConectados = dynamic(() =>
  import('./styled').then((mod) => mod.DivConectados)
);
const DivConnect = dynamic(() =>
  import('./styled').then((mod) => mod.DivConnect)
);

const DivContenedorConnect = dynamic(() =>
  import('./styled').then((mod) => mod.DivContenedorConnect)
);
const SearchUser = dynamic(() =>
  import('../searchUsers').then((mod) => mod.SearchUser)
);
const SearchBox = dynamic(() =>
  import('react-instantsearch').then((mod) => mod.SearchBox)
);
const ConnectedUsers = dynamic(() => import('./connectedUser'));
const NavegationUrl = dynamic(() => import('./navHeader'));

export default function Header({themeDate}: {themeDate: string}) {
  GetUser();
  NotificacionesUser(0);
  // const {load} = useGlobalAudioPlayer();
  const pathname = usePathname();
  const dataUser = useRecoilValue(user);
  const getAllUserData = useRecoilValue(getAllUser);
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
  const handleMenu = (e: any) => {
    e.preventDefault();
    if (menu) {
      setMenu(false);
      return;
    }
    setMenu(true);
  };
  const handleClick = (data: boolean) => {
    setMenu(data);
  };
  useEffect(() => {
    const cookieResponse = async () => {
      const setCookie = await import('cookies-next').then(
        (mod) => mod.setCookie
      );
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
    let count: any = [];
    goOnline(rtdb);
    dataUser.user.rtdb?.map((item: string) => {
      const chatrooms = ref(rtdb, '/rooms/' + item + '/messages');
      return onValue(chatrooms, (snapshot: any) => {
        const valor = snapshot.val();
        if (valor) {
          const datas: any = Object?.values(valor);
          const utlimoMensaje: any = datas[datas.length - 1];
          datas.reverse().findIndex((object: any, indice: number) => {
            if (object.id != dataUser.user.id && object.read) {
              return object;
            }
            const reversedDatas = datas.reverse();
            const lastIndex = reversedDatas.length - indice;

            if (
              reversedDatas[lastIndex] &&
              reversedDatas[lastIndex].read === false
            ) {
              return object;
            }
          });

          if (utlimoMensaje.id != dataUser.user.id) {
            if (!utlimoMensaje.read) {
              count.push(utlimoMensaje);
              setDataMessage([...count]);
              // play();
              // load('/messages.mp3', {autoplay: true});
              return;
            }
            if (utlimoMensaje.read) {
              const filtoMensa = count?.filter(
                (item: any) => item.id !== utlimoMensaje.id
              );

              if (filtoMensa) {
                count = filtoMensa;

                setDataMessage([...filtoMensa]);
              }
            }
          }
        }
      });
    });
    return () => {
      if (!dataUser?.user?.id) return;
      goOffline(rtdb);
      // userReset();
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
          return (
            e.id != Number(dataUser.user.id) &&
            e.connect &&
            dataUser.user.amigos.includes(e.id)
          );
        });
        setAllConnectAmigos(connecam);
      }
    });
  }, [dataUser?.user?.id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (dataUser?.user?.id) {
      const connectRefData = ref(rtdb, '/connect/' + dataUser?.user?.id);
      update(connectRefData, {
        ...dataUser.user,
        connect: true,
      });
    }
    const handleVisibilityChange = async () => {
      if (!dataUser?.user?.id) return;
      const connectRefData = ref(rtdb, '/connect/' + dataUser?.user?.id);
      if (document.hidden) {
        await update(connectRefData, {
          connect: false,
        });
      } else {
        await update(connectRefData, {
          ...dataUser.user,
          connect: true,
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dataUser?.user?.id]);
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
  const closeSession = () => {
    const connectRefData = ref(rtdb, '/connect/' + dataUser?.user?.id);
    return onDisconnect(connectRefData).update({connect: false});
  };
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
              {pathname !== '/search' && (
                <SearchBox
                  aria-label='searchAlgolia'
                  id='searchAlgolia'
                  placeholder='UniRed'
                  queryHook={useDebounce}
                />
              )}
              <SearchUser />
            </div>
          </div>
          <NavegationUrl
            amigos={dataSoliReci?.length}
            message={dataMessage.length}
            notification={notificacionesUserAtom?.newPubliOPen}
          />
          <div className='relative'>
            <button
              onClick={handleMenu}
              className='m-0 bg-transparent border-none '>
              <FotoPerfil
                className='w-[40px] h-[40px]'
                img={dataUser.user.img}
                connect={
                  dataIsConnect?.find((e: any) => e.id == dataUser.user?.id) &&
                  true
                }
              />
            </button>
            {menu ? (
              <Menu
                theme={theme}
                closeSession={closeSession}
                themebutton={(data: string) => setThemes(data)}
                click={handleClick}
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
        {connectAmigos ? (
          <ConnectedUsers
            allConnectAmigos={allConnectAmigos}
            dataIsConnect={dataIsConnect}
          />
        ) : null}
      </DivContenedorConnect>
    </>
  ) : (
    <SkeletonNav />
  );
}
