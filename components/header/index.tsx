"use client";
import dynamic from "next/dynamic";
import { ref, onValue, update, get, query } from "firebase/database";
import { messaging, obtenerTokenFCM, rtdb } from "@/lib/firebase";
import "./style.css";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GetFriendAccepted, GetUser, useConnectionStatus } from "@/lib/hook";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  user,
  getAllSolicitudesRecibidas,
  isMenssage,
  isConnect,
  Connect,
  notificacionesUser,
  messagesWriting,
  getAllAmigos,
  NotificationPublication,
} from "@/lib/atom";
import Logo from "@/public/logo.svg";
import { useDebouncedCallback } from "use-debounce";
import { LoaderRequest } from "../loader";
import { SkeletonNav } from "@/ui/skeleton";
import { NotificationPayload, onMessage } from "firebase/messaging";

const FotoPerfil = dynamic(() => import("@/ui/FotoPerfil"), {
  loading: () => <LoaderRequest />,
});

const DivConectados = dynamic(() => import("./styled").then((mod) => mod.DivConectados), {
  loading: () => <LoaderRequest />,
});

const DivConnect = dynamic(() => import("./styled").then((mod) => mod.DivConnect), {
  loading: () => <LoaderRequest />,
});

const DivContenedorConnect = dynamic(
  () => import("./styled").then((mod) => mod.DivContenedorConnect),
  {
    loading: () => <LoaderRequest />,
  }
);
const SearchUser = dynamic(() => import("../searchUsers").then((mod) => mod.SearchUser));
const SearchBox = dynamic(() => import("react-instantsearch").then((mod) => mod.SearchBox));
const ConnectedUsers = dynamic(() => import("./connectedUser"));
const NavegationUrl = dynamic(() => import("./navHeader"));

export async function subscribeToPush() {
  if (!("serviceWorker" in navigator)) throw new Error("No service worker support");
  const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") throw new Error("Permiso de notificaciones denegado");
  return registration;
}

export default function Header({ themeDate }: { themeDate: string }) {
  const [firstConect, setFirstConnect] = useState(false);
  GetUser();
  GetFriendAccepted();
  const pathname = usePathname();
  const [dataMessage, setDataMessage] = useRecoilState(isMenssage);
  const [dataUser, setDataUser] = useRecoilState(user);
  const [dataIsConnect, setIsConnect] = useRecoilState(isConnect);
  const [dataMessagesWriting, setMessagesWriting] = useRecoilState(messagesWriting);
  const [notificacionesUserAtom, setNotificacionesUserAtom] = useRecoilState(notificacionesUser);
  const dataSoliReci = useRecoilValue(getAllSolicitudesRecibidas);
  const [allConnectAmigos, setAllConnectAmigos] = useState([]);
  const [connectAmigos, setConnectAmigos] = useState(false);
  const [menu, setMenu] = useState(false);
  const [theme, setThemes] = useState<string>(themeDate);
  const [openNav, setOpenNav] = useState(true);
  const lastScrollY = useRef(0);
  const useAmigosAll = useRecoilValue(getAllAmigos);
  const modalRef = useRef<HTMLDivElement>(null);
  const useDebounce = useDebouncedCallback((query, search) => {
    search(query);
  }, 1000);
  useConnectionStatus(dataUser.user);

  useEffect(() => {
    const cookieResponse = async () => {
      const setCookie = await import("cookies-next").then((mod) => mod.setCookie);
      setCookie("theme", theme);
      if (theme !== "true") {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    };
    cookieResponse();
  }, [theme]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;

    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        alert("Este navegador no esta disponible las notificaciones");
        return;
      }

      if (Notification.permission === "default") {
        try {
          await Notification.requestPermission();
        } catch (err) {
          // console.error('Error solicitando permiso de notificaciones:', err);
        }
      }
    };

    requestNotificationPermission();

    const audio = new Audio("/notification.mp3");
    audio.load();

    const unsubscribes = dataUser.user.rtdb.map((item) => {
      const chatrooms = ref(rtdb, "/rooms/" + item + "/messages");

      return onValue(chatrooms, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const datas = Object.values(valor);
          const ultimoMensaje: any = datas[datas.length - 1];
          if (ultimoMensaje.id) {
            const keys = Object.keys(valor);
            const lastKey = keys[keys.length - 1];
            const userdataRef = ref(rtdb, "/rooms/" + item);
            get(userdataRef).then((user) => {
              const data = user.val();
              const isOpen = data[dataUser.user.id];

              if (
                (isOpen && isOpen.isOpen) ||
                ultimoMensaje.id == dataUser.user.id ||
                ultimoMensaje.status == "Recibido"
              ) {
                return;
              } else {
                // audio.play().catch(() => {});
                // if (Notification.permission === 'granted') {
                //   const options = {
                //     body: ultimoMensaje.message,
                //     icon: ultimoMensaje.img, // Icono que se muestra en la notificación
                //     image: '/logo.webp', // Imagen en tamaño completo (puede ser más grande)
                //     title: ultimoMensaje.fullName,
                //     badge: ultimoMensaje.img, // Icono pequeño que aparece en la barra de notificación
                //   };
                //   new Notification(ultimoMensaje.fullName, options);
                // }
              }
            });
            if (ultimoMensaje.id !== dataUser.user.id && ultimoMensaje.status === "Enviado") {
              const mensajeRef = ref(rtdb, `/rooms/${item}/messages/${lastKey}`);
              update(mensajeRef, { status: "Recibido" });
            }
            setDataMessage((prev) => {
              if (prev.length) {
                const findMessageRtdbEqual = prev.find((message) => message.rtdb === item);
                if (findMessageRtdbEqual) {
                  return prev.map((message) =>
                    message.rtdb === item ? { ...ultimoMensaje, rtdb: item } : message
                  );
                } else {
                  return [...prev, { ...ultimoMensaje, rtdb: item }];
                }
              } else {
                return [{ ...ultimoMensaje, rtdb: item }];
              }
            });
          }
        }
      });
    });

    // Limpiar los listeners al desmontar
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [dataUser?.user?.rtdb]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    const unsubscribes = dataUser.user.rtdb.map((item) => {
      const chatrooms = ref(rtdb, "/rooms/" + item);

      return onValue(chatrooms, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const valores = Object.keys(valor) // Obtener todas las claves
            .filter((key: any) => !isNaN(key) && Number(key) !== dataUser.user.id) // Filtrar las numéricas que no coincidan con el ID
            .map((key) => valor[key]);
          if (valores[0]) {
            setMessagesWriting([
              ...dataMessagesWriting,
              { id: valores[0].user, writing: valores[0].writing },
            ]);
          }
        }
      });
    });

    // Limpiar los listeners al desmontar
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [dataUser?.user?.rtdb]);

  useEffect(() => {
    if (!dataUser?.user?.id) return;
    const connectRef = ref(rtdb, "/connect");
    onValue(connectRef, async (snapshot: any) => {
      const valor = snapshot.val();
      if (valor) {
        const dataConnect: any = Object.values(valor);
        setIsConnect(dataConnect);
        const connecam = dataConnect.filter((e: Connect) => {
          return (
            e.id != Number(dataUser.user.id) &&
            e.connect &&
            useAmigosAll.data.find((user) => user.id === e.id)
          );
        });
        setAllConnectAmigos(connecam);
      }
    });
  }, [dataUser?.user?.id]);

  //----------------------- NOTIFICACIONES POR RTDB Y NUEVOS mensajes
  useEffect(() => {
    if (dataUser.user.id) {
      if (!firstConect) {
        const useConnectUser = async () => {
          const registration = await subscribeToPush();
          const tokenFCM = await obtenerTokenFCM(registration);

          if (!tokenFCM) return;
          const userConnectPushPWA = (await import("@/lib/hook")).userConnectPushPWA;
          await userConnectPushPWA({
            userId: dataUser.user.id,
            tokenFCM,
          });
          setFirstConnect(true);
        };
        useConnectUser();
      }
      onMessage(messaging, (payload) => {
        console.log("Este es el payload", payload);
        const { title, body } = payload.notification as NotificationPayload;
        if (!title || !body) return;
        new Notification(title, { body });
      });
      const notificationAllRef = query(ref(rtdb, `/notifications/${dataUser.user.id}`));
      onValue(notificationAllRef, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const data: NotificationPublication[] = Object.values(valor);
          const newPubliOPen = data.filter((noti) => !noti.read).length || 0;
          setNotificacionesUserAtom((prev) => ({ ...prev, newPubliOPen: newPubliOPen }));
        }
      });
    }
  }, [dataUser?.user?.id]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    function getCookieValue(name: string) {
      const cookies = document.cookie.split("; ").map((cookie) => cookie.split("="));
      const found = cookies.find(([key]) => key === name);
      return found ? decodeURIComponent(found[1]) : null;
    }

    const login = getCookieValue("token"); // Busca la cookie 'login'
    if (login || login === null || login === undefined) {
      setDataUser((prev) => ({
        isLoading: prev.isLoading,
        user: prev.user,
      }));
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return !dataUser?.isLoading ? (
    dataUser?.user?.id ? (
      <>
        <header
          className={`${
            openNav ? "translate-y-0" : "max-md:-translate-y-full"
          } p-2 sticky top-0 right-0 left-0 z-10 bg-primary transition-transform duration-300 dark:bg-darkComponet`}
        >
          <nav className='flex justify-between items-center max-md:justify-between max-w-screen-lg m-auto'>
            <div className='flex gap-4 items-center '>
              <Link href={"/inicio"} aria-label='home'>
                <Logo className='rounded-md fill-unired transition-dark' />
              </Link>
              <div className='border-none relative max-md:hidden '>
                {pathname !== "/search" && (
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
              message={
                dataMessage.filter((message) => !message.read && message.id != dataUser.user.id)
                  .length
              }
              notification={notificacionesUserAtom?.newPubliOPen}
            />
            <div className='relative ' ref={modalRef}>
              <button
                onClick={() => setMenu((isMenu) => !isMenu)}
                className='m-0 bg-transparent border-none relative z-50'
              >
                <FotoPerfil
                  className='w-[40px] h-[40px] hover:opacity-70'
                  img={dataUser.user.img}
                  connect={dataIsConnect?.find((e: any) => e.id == dataUser.user?.id) && true}
                />
              </button>
              {menu ? (
                <Menu
                  pathname={pathname}
                  theme={theme}
                  themebutton={(data: string) => setThemes(data)}
                  click={(data: boolean) => setMenu(data)}
                  userImg={dataUser.user.img}
                  userName={dataUser.user.fullName.split(" ")[0]}
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
            <ConnectedUsers allConnectAmigos={allConnectAmigos} dataIsConnect={dataIsConnect} />
          ) : null}
        </DivContenedorConnect>
      </>
    ) : (
      <header className='bg-primary dark:bg-darkComponet dark:text-white text-secondary p-4 '>
        <div className='flex justify-between items-center max-md:justify-between max-w-screen-lg m-auto'>
          <Link href={"/"} aria-label='logo unired' title='logo unired'>
            <Logo className='rounded-md fill-unired transition-dark' />
          </Link>
          <nav>
            <ul className='flex space-x-4'>
              <li>
                <Link
                  href='/iniciarSesion'
                  className='cursor-pointer transition-all bg-light text-white px-6 py-2 rounded-lg border-light border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-light shadow-light active:shadow-none '
                >
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  ) : (
    <SkeletonNav />
  );
}
