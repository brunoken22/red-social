'use client';
import dynamic from 'next/dynamic';
import {
  ref,
  onValue,
  update,
  onDisconnect,
  goOffline,
  goOnline,
  off,
  get,
  child,
  getDatabase,
} from 'firebase/database';
import {rtdb} from '@/lib/firebase';
import './style.css';
import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';
import {GetUser, NotificacionesUser} from '@/lib/hook';
// import {useGlobalAudioPlayer} from 'react-use-audio-player';
import Link from 'next/link';
import {Menu} from '@/components/menu';
import {useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';
import {
  user,
  getAllSolicitudesRecibidas,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  User,
  getAllUser,
  getAllUsersChat,
} from '@/lib/atom';
import Logo from '@/public/logo.svg';
import {useDebounce} from 'use-debounce';
const SkeletonNav = dynamic(() =>
  import('@/ui/skeleton').then((mod) => mod.SkeletonNav)
);
const FotoPerfil = dynamic(() => import('@/ui/FotoPerfil'));

const ButtonSmsConnect = dynamic(() =>
  import('@/ui/boton').then((mod) => mod.ButtonSmsConnect)
);
const DivConectados = dynamic(() =>
  import('./styled').then((mod) => mod.DivConectados)
);
const DivConnect = dynamic(() =>
  import('./styled').then((mod) => mod.DivConnect)
);
const DivConnectAll = dynamic(() =>
  import('./styled').then((mod) => mod.DivConnectAll)
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
const NavegationUrl = dynamic(() => import('./navHeader'));

export default function Header({themeDate}: {themeDate: string}) {
  GetUser();
  NotificacionesUser(0);
  // const {load} = useGlobalAudioPlayer();
  const pathname = usePathname();
  const router = useRouter();
  const dataUser = useRecoilValue(user);
  const getAllUserData = useRecoilValue(getAllUser);
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const setDatagetAllUsersChat = useSetRecoilState(getAllUsersChat);
  const [dataIsConnect, setIsConnect] = useRecoilState(isConnect);
  const notificacionesUserAtom = useRecoilValue(notificacionesUser);
  // const [notificationSound, setNotificationSound] = useState<any[]>([]);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const [search, setSearch] = useState('');
  const [allConnectAmigos, setAllConnectAmigos] = useState([]);
  const [connectAmigos, setConnectAmigos] = useState(false);
  const [menu, setMenu] = useState(false);
  const [theme, setThemes] = useState<string>(themeDate);
  const [value] = useDebounce(search, 1000);
  const [openNav, setOpenNav] = useState(true);
  const lastScrollY = useRef(0);
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

    const dbRef = ref(getDatabase());
    get(child(dbRef, 'rooms')).then((snapshot) => {
      if (snapshot.exists()) {
        const value = Object.values(snapshot.val());

        const userDataMenssage = value.filter(
          (dataUserChat: any) =>
            dataUserChat.userId == dataUser.user.id ||
            dataUserChat.amigoId == dataUser.user.id
        );
        if (userDataMenssage) {
          const userChatUser = userDataMenssage.map((snap: any) => {
            if (snap.userId == dataUser.user.id) {
              return Number(snap.amigoId);
            }
            if (snap.amigoId == dataUser.user.id) return snap.userId;
          });
          const newUserConnectChat = getAllUserData.filter((item: User) =>
            userChatUser.includes(item.id)
          );
          setDatagetAllUsersChat(newUserConnectChat);
        }
      } else {
      }
    });
  }, [dataUser?.user?.id, getAllUserData, dataMessage]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    goOnline(rtdb);
    const connectRef = ref(rtdb, '/connect');
    const connectRefData = ref(rtdb, '/connect/' + dataUser?.user?.id);
    onValue(connectRef, (snapshot: any) => {
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
        update(connectRefData, {
          ...dataUser?.user,
          connect: true,
        });
      }
    });
    window.addEventListener('beforeunload', () => {
      onDisconnect(connectRefData).update({connect: false});
    });
    return () => {
      if (!dataUser?.user?.id) return;
      onDisconnect(connectRefData).update({connect: false});
      goOffline(rtdb);
      off(connectRef);
      off(connectRefData);
      // userReset();
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
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
              {pathname !== '/search' && (
                <SearchBox
                  placeholder='UniRed'
                  onChangeCapture={(e: any) => {
                    e.target.form
                      .querySelector('.ais-SearchBox-reset')
                      .addEventListener('click', () => setSearch(''));
                    setSearch(e.target.value);
                  }}
                />
              )}

              {value && pathname !== '/search' ? <SearchUser /> : null}
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
          allConnectAmigos?.length > 0 ? (
            <DivConnectAll>
              {allConnectAmigos.map((e: User) => (
                <ButtonSmsConnect
                  key={e.id}
                  onClick={() =>
                    router.push(
                      '/chat?fullName=' +
                        e.fullName +
                        '&rtdb=' +
                        e.rtdb +
                        '&id=' +
                        e.id +
                        '&img=' +
                        e.img
                    )
                  }>
                  <FotoPerfil
                    img={e.img}
                    className='h-[30px] w-[30px]'
                    connect={
                      dataIsConnect?.find(
                        (eConnect: any) => e.id == eConnect.id
                      )?.connect && true
                    }
                  />

                  <span className='text-black whitespace-nowrap overflow-hidden text-ellipsis'>
                    {e.fullName}
                  </span>
                </ButtonSmsConnect>
              ))}
            </DivConnectAll>
          ) : (
            <div className='text-center'>No hay conectados</div>
          )
        ) : null}
      </DivContenedorConnect>
    </>
  ) : (
    <SkeletonNav />
  );
}
