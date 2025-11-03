"use client";
import dynamic from "next/dynamic";
import { ref, onValue, update, get, query } from "firebase/database";
import { messaging, obtenerTokenFCM, rtdb } from "@/lib/firebase";
// import "./style.css";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GetFriendAccepted, GetFriendReceived, GetUser, useConnectionStatus } from "@/lib/hook";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { LoaderRequest } from "../loader";
import { SkeletonNav } from "@/ui/skeleton";
import { onMessage } from "firebase/messaging";
import LogoPage from "@/ui/logo";
import {
  Connect,
  Message,
  NotificationPublication,
  useFriendAll,
  useIsConnected,
  useMessagesUserStore,
  useMessageWritingStore,
  useNotificationUser,
  useOpenChatUser,
  useReceivedUserStore,
  useUser,
} from "@/lib/store";
import { SearchUsers } from "../searchUsers";

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
  GetFriendReceived();

  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const isConnected = useIsConnected((state) => state.connected);
  const setIsConnected = useIsConnected((state) => state.setIsConnected);
  const messages = useMessagesUserStore((state) => state.messages);
  const setMessagesUser = useMessagesUserStore((state) => state.setMessagesUser);
  const messagesWriting = useMessageWritingStore((state) => state.messagesWriting);
  const setMessagesWritingUser = useMessageWritingStore((state) => state.setMessagesWritingUser);
  const notificationUser = useNotificationUser((state) => state.notificationUser);
  const setNotificationUser = useNotificationUser((state) => state.setNotificationUser);
  const receivedUsers = useReceivedUserStore((store) => store.receivedUsers);
  const [allConnectAmigos, setAllConnectAmigos] = useState([]);
  const [connectAmigos, setConnectAmigos] = useState(false);
  const [menu, setMenu] = useState(false);
  const [theme, setThemes] = useState<string>(themeDate);
  const [openNav, setOpenNav] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const lastScrollY = useRef(0);
  const { friendAll } = useFriendAll();
  const modalRef = useRef<HTMLDivElement>(null);
  const openChatUser = useOpenChatUser((state) => state.value);

  useConnectionStatus(user);

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
    if (!user?.id) return;

    const requestNotificationPermission = async () => {
      if (!("Notification" in window)) {
        alert("Este navegador no esta disponible las notificaciones");
        return;
      }

      if (Notification.permission === "default") {
        await Notification.requestPermission();
      }
    };

    requestNotificationPermission();

    const unsubscribes = user.rtdb.map((item) => {
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
            get(userdataRef).then((userData) => {
              const data = userData.val();
              const isOpen = data[user.id];

              if (
                (isOpen && isOpen.isOpen) ||
                ultimoMensaje.id == user.id ||
                ultimoMensaje.status == "Recibido"
              ) {
                return;
              } else {
                // audio.play().catch(() => {});
                // if (Notification.permission === 'granted') {
                //   const options = {
                //     body: ultimoMensaje.message,
                //     icon: ultimoMensaje.img, // Icono que se muestra en la notificación
                //     image: '/icon512_rounded.png', // Imagen en tamaño completo (puede ser más grande)
                //     title: ultimoMensaje.fullName,
                //     badge: ultimoMensaje.img, // Icono pequeño que aparece en la barra de notificación
                //   };
                //   new Notification(ultimoMensaje.fullName, options);
                // }
              }
            });
            if (ultimoMensaje.id !== user.id && ultimoMensaje.status === "Enviado") {
              const mensajeRef = ref(rtdb, `/rooms/${item}/messages/${lastKey}`);
              update(mensajeRef, { status: "Recibido" });
            }
            const lastet_messages = (): Message[] => {
              if (messages.length) {
                const findMessageRtdbEqual = messages.find((message) => message.rtdb === item);
                if (findMessageRtdbEqual) {
                  return messages.map((message) =>
                    message.rtdb === item ? { ...ultimoMensaje, rtdb: item } : message
                  );
                } else {
                  return [...messages, { ...ultimoMensaje, rtdb: item }];
                }
              } else {
                return [{ ...ultimoMensaje, rtdb: item }];
              }
            };
            setMessagesUser([...messages, ...lastet_messages()]);
          }
        }
      });
    });

    // Limpiar los listeners al desmontar
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, [user.rtdb]);

  useEffect(() => {
    if (!user.id) return;
    const unsubscribes = user.rtdb.map((item) => {
      const chatrooms = ref(rtdb, "/rooms/" + item);

      return onValue(chatrooms, (snapshot) => {
        const valor = snapshot.val();
        if (valor) {
          const valores = Object.keys(valor) // Obtener todas las claves
            .filter((key: any) => !isNaN(key) && Number(key) !== user.id) // Filtrar las numéricas que no coincidan con el ID
            .map((key) => valor[key]);
          if (valores[0]) {
            setMessagesWritingUser([
              ...messagesWriting,
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
  }, [user.rtdb]);

  useEffect(() => {
    if (!user?.id) return;
    const connectRef = ref(rtdb, "/connect");
    onValue(connectRef, async (snapshot: any) => {
      const valor = snapshot.val();
      if (valor) {
        const dataConnect: any = Object.values(valor);
        setIsConnected(dataConnect);
        const connecam = dataConnect.filter((e: Connect) => {
          return e.id != Number(user.id) && e.connect && friendAll.find((user) => user.id === e.id);
        });
        setAllConnectAmigos(connecam);
      }
    });
  }, [user.id, friendAll]);

  // ----------------------- NOTIFICACIONES POR RTDB Y NUEVOS mensajes
  useEffect(() => {
    if (!user.id) return;

    const broadcastChannel = new BroadcastChannel("fcm_messages");

    // Escuchar mensajes de otros tabs o del service worker
    broadcastChannel.onmessage = (event) => {
      if (event.data.type === "NEW_MESSAGE" && document.hidden) {
        setNewMessage(event.data.payload?.notification?.title || "");
      }

      // ✅ AGREGAR ESTO PARA MENSAJES DEL SERVICE WORKER
      if (event.data.type === "NEW_MESSAGE_BACKGROUND" && document.hidden) {
        setNewMessage(event.data.payload?.notification?.title || "");
      }
    };

    if (!firstConect) {
      const useConnectUser = async () => {
        const registration = await subscribeToPush();
        const tokenFCM = await obtenerTokenFCM(registration);

        if (!tokenFCM) return;
        const userConnectPushPWA = (await import("@/lib/hook")).userConnectPushPWA;
        await userConnectPushPWA({
          userId: user.id,
          tokenFCM,
        });
        setFirstConnect(true);
      };
      useConnectUser();
    }

    // Solo manejar mensajes en foreground
    if (messaging) {
      onMessage(messaging, (payload) => {
        // Si el chat abierto es diferente, mostrar notificación
        if (payload.data?.room_id !== openChatUser) {
          const { title, body } = payload.notification || {};
          if (title && body) {
            new Notification(title, { body, data: { url: "/perfil" } });
          }
        }

        // Broadcast a otros tabs
        broadcastChannel.postMessage({
          type: "NEW_MESSAGE",
          payload: payload,
        });
      });
    }

    const notificationAllRef = query(ref(rtdb, `/notifications/${user.id}`));
    onValue(notificationAllRef, (snapshot) => {
      const valor = snapshot.val();
      if (valor) {
        const data: NotificationPublication[] = Object.values(valor);
        const newPubliOpen = data.filter((noti) => !noti.read).length || 0;
        setNotificationUser({ ...notificationUser, newPubliOpen });
      }
    });

    // Cleanup
    return () => {
      broadcastChannel.close();
    };
  }, [user.id, openChatUser, firstConect]);

  // MODIFICANDO EL TITLE DE LA PAGINA POR MENSAJE
  useEffect(() => {
    const originalTitle = document.title;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Restaurar título original inmediatamente
        document.title = originalTitle;

        // Limpiar mensaje después de un breve delay para evitar parpadeo
        timeoutId = setTimeout(() => {
          setNewMessage("");
        }, 1000);
      } else if (newMessage) {
        // Cambiar título cuando hay mensaje y la pestaña está oculta
        document.title = newMessage;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // También cambiar título inmediatamente si llega mensaje y estamos en background
    if (document.hidden && newMessage) {
      document.title = newMessage;
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [newMessage]);

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
      return;
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

  return !isLoading ? (
    user?.id ? (
      <>
        <header
          className={`${
            openNav ? "translate-y-0" : "max-md:-translate-y-full"
          } p-2 sticky top-0 right-0 left-0 z-10 bg-primary transition-transform duration-300 dark:bg-darkComponet`}
        >
          <nav className='flex justify-between items-center max-md:justify-between max-w-screen-lg m-auto'>
            <div className='flex gap-4 items-center '>
              <Link href={"/"} title='logo' aria-label='logo' className='w-auto m-auto'>
                <LogoPage />
              </Link>
              <div className='border-none relative max-md:hidden '>
                {pathname !== "/search" && <SearchUsers />}
              </div>
            </div>
            <NavegationUrl
              amigos={receivedUsers.length}
              message={messages.filter((message) => !message.read && message.id != user.id).length}
              notification={notificationUser.newPubliOpen}
            />
            <div className='relative ' ref={modalRef}>
              <button
                onClick={() => setMenu((isMenu) => !isMenu)}
                className='m-0 bg-transparent border-none relative z-50'
              >
                <FotoPerfil
                  title={user.fullName}
                  className='w-[40px] h-[40px] hover:opacity-70'
                  img={user.img}
                  connect={isConnected?.find((e: any) => e.id == user?.id) && true}
                />
              </button>
              {menu ? (
                <Menu
                  pathname={pathname}
                  theme={theme}
                  themebutton={(data: string) => setThemes(data)}
                  click={(data: boolean) => setMenu(data)}
                  userImg={user.img}
                  userName={user.fullName.split(" ")[0]}
                />
              ) : null}
            </div>
          </nav>
        </header>

        <DivContenedorConnect>
          <DivConectados onClick={() => setConnectAmigos(!connectAmigos)}>
            <span className='text-primary'>Conectados</span> <DivConnect />
          </DivConectados>
          {connectAmigos ? (
            <ConnectedUsers allConnectAmigos={allConnectAmigos} dataIsConnect={isConnected} />
          ) : null}
        </DivContenedorConnect>
      </>
    ) : (
      <header className='bg-primary dark:bg-darkComponet dark:text-white text-secondary p-4 '>
        <div className='flex justify-between items-center max-md:justify-between max-w-screen-lg m-auto'>
          <Link href={"/"} title='logo' aria-label='logo' className='contents w-auto m-auto'>
            <LogoPage />
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
