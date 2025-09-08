import { usePathname } from "next/navigation";
import Link from "next/link";
import { DivNotificacionActi } from "./styled";
import { FiSearch, FiHome, FiUsers, FiMessageSquare, FiBell } from "react-icons/fi";

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
  const className = "relative";
  const isOpen = "p-2 bg-light rounded-full";

  const navegationsUrl = [
    {
      pathname: "/search",
      icon: FiSearch,
      title: "Buscar",
      md: "hidden",
    },
    {
      pathname: "/inicio",
      icon: FiHome,
      title: "Inicio",
    },
    {
      pathname: "/amigos",
      icon: FiUsers,
      title: "Amigos",
      notification: amigos,
    },
    {
      pathname: "/chat",
      icon: FiMessageSquare,
      title: "Chat",
      notification: message,
    },
    {
      pathname: "/notificaciones",
      icon: FiBell,
      title: "Notificaciones",
      notification: notification,
    },
  ];

  return (
    <div className='flex justify-evenly items-center gap-8 max-md:gap-4'>
      {navegationsUrl.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={index}
            href={item.pathname}
            aria-label={item.title}
            title={item.title}
            className={`${item.pathname === "/search" ? "hidden max-md:block" : ""} ${
              pathname === item.pathname ? isOpen : ""
            } ${className}`}
          >
            {item.notification ? (
              <DivNotificacionActi>{item.notification}</DivNotificacionActi>
            ) : null}
            <IconComponent
              size={26}
              className={`${
                pathname === item.pathname
                  ? "text-white w-5 h-5"
                  : "hover:opacity-70 dark:text-gray-200 text-gray-600"
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
