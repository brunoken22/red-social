import useSWR, { mutate } from "swr";
import useSWRInfinite from "swr/infinite";
import { fetchApiSwr } from "./api";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  user,
  publicacionUser,
  getAllSolicitudesRecibidas,
  getAllAmigos,
  getAllSolicitudesEnviadas,
  publicacionAmigos,
  publicacionSearchUser,
  Publicacion,
  getSugerenciaAmigos,
  User,
} from "@/lib/atom";
import { useEffect, useState } from "react";
import { urltoBlob, filetoDataURL, compressAccurately } from "image-conversion";
import { getCookie, setCookie } from "cookies-next";
import { MessageUserChat } from "@/components/templateMensaje";

type DataUser = {
  fullName?: string;
  email?: string;
  password?: string;
  img?: string;
  accessToken?: string;
  code?: string;
};
type Solicitud = {
  amigoId?: number;
  userId?: number;
};
import { getDatabase, ref, onValue, onDisconnect, set } from "firebase/database";

export async function userConnectPushPWA(userConnect: any) {
  const option = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(userConnect),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const subscribe = await fetchApiSwr("/subscribe", option);
  return subscribe;
}
export const useConnectionStatus = (user: User) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const db = getDatabase();
    const userStatusRef = ref(db, `/connect/${user.id}`);
    const connectedRef = ref(db, ".info/connected");

    const isOnline = {
      ...user,
      connect: true,
      lastChanged: Date.now(),
    };

    const isOffline = {
      ...user,
      connect: false,
      lastChanged: Date.now(),
    };

    // Escuchar cambios en la conexión
    const unsubscribe = onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        set(userStatusRef, isOnline);
        onDisconnect(userStatusRef).set(isOffline);
        setStatus(true);
      } else {
        setStatus(false);
      }
    });

    // Limpiar cuando se desmonte el componente
    return () => unsubscribe();
  }, [user]);

  return status;
};
export async function logOut() {
  const api = "/log-out";
  const option = {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(option);

  const data = await fetchApiSwr(api, option);
  console.log(data);
  if (data) {
    setCookie("token", "");
  }
  return data;
}
export async function modificarUser(dataUser: DataUser) {
  const api = "/user/token";
  const token = getCookie("token");
  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(dataUser),
  };

  const dataMod =
    dataUser?.fullName || dataUser?.email || dataUser?.password || dataUser?.img
      ? await fetchApiSwr(api, option)
      : null;

  if (dataMod) {
    await mutate("/user/token");
  }
  return dataMod;
}
export async function sendResetPassword(dataUser: DataUser) {
  const api = "/user/send-reset-password";
  const token = getCookie("token");
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export async function validationResetPassword(dataUser: DataUser) {
  const api = "/user/validation-reset-password";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email && dataUser.code ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export async function resetPassword(dataUser: DataUser) {
  const api = "/user/reset-password";
  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email && dataUser.password ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export function GetUser() {
  const setUserData = useSetRecoilState(user);
  const token = getCookie("token");
  const user_info = "/user/info";

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const { data: dataUser, isLoading } = useSWR(
    token ? user_info : null,
    (url) => fetchApiSwr(url, option),
    {
      refreshInterval: 100000,
    }
  );

  useEffect(() => {
    if (isLoading) return;
    if (!token)
      setUserData((prev) => ({
        ...prev,
        isLoading: false,
      }));
    if (dataUser?.id) {
      setUserData({
        isLoading: false,
        user: dataUser,
      });
      return;
    } else {
      setUserData((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, [dataUser]);

  return { dataUser, isLoading };
}
export function GetFriendAccepted() {
  const setAmigosAllData = useSetRecoilState(getAllAmigos);
  const token = getCookie("token");
  // if (!token) return;
  const friend_accepted = "/user/friendAccepted";

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, mutate } = useSWR(token ? friend_accepted : null, (url) =>
    fetchApiSwr(url, option)
  );

  useEffect(() => {
    if (isLoading) return;
    setAmigosAllData({ isLoading: false, data: data });
  }, [data]);
  return { data, isLoading, mutateAccepted: mutate };
}
export function GetFriendPending() {
  const setGetSugerenciaAmigosData = useSetRecoilState(getSugerenciaAmigos);
  const token = getCookie("token");
  // if (!token) return;
  const friend_accepted = "/user/friendPending";

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, mutate } = useSWR(token ? friend_accepted : null, (url) =>
    fetchApiSwr(url, option)
  );

  useEffect(() => {
    if (isLoading) return;
    setGetSugerenciaAmigosData(data);
  }, [data]);
  return { data, isLoading, mutatePending: mutate };
}
export function GetFriendSend() {
  const setSoliAllEnv = useSetRecoilState(getAllSolicitudesEnviadas);
  const token = getCookie("token");
  // if (!token) return

  const friend_accepted = "/user/friendEnv";

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, mutate } = useSWR(token ? friend_accepted : null, (url) =>
    fetchApiSwr(url, option)
  );

  useEffect(() => {
    if (isLoading) return;
    setSoliAllEnv(data);
  }, [data]);

  return { data, isLoading, mutateSend: mutate };
}
export function GetFriendReceived() {
  const setSoliAllReci = useSetRecoilState(getAllSolicitudesRecibidas);
  const token = getCookie("token");
  // if (!token) return;
  const friend_accepted = "/user/friendReci";

  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading, mutate } = useSWR(token ? friend_accepted : null, (url) =>
    fetchApiSwr(url, option)
  );

  useEffect(() => {
    if (isLoading) return;
    setSoliAllReci(data);
  }, [data]);
  return { data, isLoading, mutateReceived: mutate };
}
export function GetAllUserChat() {
  const token = getCookie("token");
  const api = "/user/chat-users";
  const option = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { data, isLoading } = useSWR(token ? api : null, (url) => fetchApiSwr(url, option), {
    refreshInterval: 10000,
  });

  return { data, isLoading };
}
export function GetAllPublicaciones(isMutate = false) {
  const setPublicacionesAllAmigos = useSetRecoilState(publicacionAmigos);
  const token = getCookie("token");

  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  const { data, isLoading, setSize, size, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length && isMutate) return null;
      return `/user/amigos/publicaciones?offset=${pageIndex * 10}`;
    },
    (api) => fetchApiSwr(api, option)
  );
  useEffect(() => {
    if (data && data.length) {
      const flatArray = data.flat();
      setPublicacionesAllAmigos(flatArray);
    }
  }, [data]);

  return {
    dataPubliAllAmigosSwr: data,
    isLoadingAllAmigos: isLoading,
    setSize,
    size,
    mutate,
  };
}
export function GetAllPublicacionesUser(isMutate = false) {
  const setPublicacionesUser = useSetRecoilState(publicacionUser);
  const token = getCookie("token");
  const PAGE_SIZE = 10; // Tamaño de página constante

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  const { data, isLoading, setSize, size, mutate, isValidating } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // Cuando llegamos al final (no hay más datos)
      if (previousPageData && !previousPageData.length) return null;

      return `/user/publicacion?offset=${pageIndex * PAGE_SIZE}&limit=${PAGE_SIZE}`;
    },
    (api) => fetchApiSwr(api, options),
    {
      revalidateFirstPage: false, // Opcional: mejora rendimiento
      initialSize: 1, // Número inicial de páginas a cargar
    }
  );

  useEffect(() => {
    if (data) {
      const flatArray = data.flat();
      setPublicacionesUser(flatArray);
    }
  }, [data]);

  // Función para cargar más datos
  const loadMore = () => {
    setSize(size + 1);
  };

  // Verificar si hay más datos para cargar
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    dataPubliAllAmigosSwr: data?.flat() || [],
    isLoading,
    loadMore,
    isReachingEnd,
    isRefreshing,
    size,
    mutatePublicacionesUser: mutate,
  };
}
export function GetPubliAmigo(id: string) {
  const setPublicacionesAmigo = useSetRecoilState(publicacionSearchUser);
  const token = getCookie("token");
  const PAGE_SIZE = 10; // Tamaño constante de página

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  const { data, isLoading, setSize, size, mutate, isValidating, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      // Condición para detener la paginación
      if (previousPageData && !previousPageData.length) return null;

      return `/user/amigos/publicaciones/${id}?offset=${pageIndex * PAGE_SIZE}&limit=${PAGE_SIZE}`;
    },
    (api) => fetchApiSwr(api, options),
    {
      revalidateFirstPage: false,
      initialSize: 1,
      // Revalidar cuando cambia el ID
      revalidateAll: id ? true : false,
    }
  );

  useEffect(() => {
    if (data) {
      const flatArray = data.flat();
      setPublicacionesAmigo(flatArray);
    }
  }, [data, id]); // Añadir id como dependencia

  // Función para cargar más publicaciones
  const loadMore = () => {
    if (!isLoading && !isReachingEnd) {
      setSize(size + 1);
    }
  };

  // Estados de control
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  return {
    dataPubliAmigo: data?.flat() || [],
    isLoadingGetFriend: isLoading,
    isError: error,
    loadMore,
    isReachingEnd,
    isRefreshing: isRefreshing,
    currentPage: size,
    refreshPublicaciones: () => mutate(),
    mutatePublicacionesUser: mutate,
  };
}
export function DeletePublic(id: number) {
  const [publicacionesUser, setPublicacionesUser] = useRecoilState(publicacionUser);
  const [isProcessing, setIsProcessing] = useState(false); // ← Estado adicional
  const api = "/user/publicacion/" + id;
  const token = getCookie("token");

  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };

  const { data, isLoading } = useSWR(id > -1 ? api : null, (url) => fetchApiSwr(url, option));

  useEffect(() => {
    if (id > -1) {
      setIsProcessing(true);
      if (!isLoading) {
        if (data) {
          const newPublic =
            publicacionesUser && publicacionesUser.filter((publi: Publicacion) => publi.id != id);

          setPublicacionesUser(newPublic);
        } else {
          setIsProcessing(false);
        }
      }
    }
  }, [data, id, isLoading]);

  return {
    dataDelete: data,
    isLoadingDeletePubli: isProcessing,
  };
}
export async function CreatePublicacion(dataPubli: { description: string; img: File[] }) {
  const api = "/user/publicacion";
  const formData = new FormData();
  const token = getCookie("token");

  // Agregamos la descripción
  formData.append("description", dataPubli.description);

  // Agregamos las imágenes (pueden ser múltiples)
  dataPubli.img.forEach((file) => {
    formData.append("media", file); // 'images' debe coincidir con el nombre que espera Multer en el backend
  });

  const option = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formData,
  };

  const dataNotiSwr = await fetchApiSwr(api, option);
  return dataNotiSwr;
}
export async function createSolicitud(dataSoli: Solicitud) {
  const api = "/user/solicitudAmistad/" + dataSoli.amigoId;
  const token = getCookie("token");

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  };
  const shouldFetch = dataSoli.amigoId && dataSoli.amigoId >= 1;
  const data = shouldFetch ? await fetchApiSwr(api, option) : null;

  if (data) {
    await mutate("/user/token");
    await mutate("/user/amigos/" + dataSoli.amigoId);
  }

  return { dataCreateSoli: data };
}
export async function aceptarSolicitud(id: number) {
  const api = "/user/amigos/" + id;
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  const data = await fetchApiSwr(api, option);
  if (data) {
    await mutate("/user/token");
  }
  return data;
}
export async function rechazarSolicitud(dataSoli: Solicitud) {
  const api = "/user/solicitudAmistad/" + dataSoli.userId;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  const data = dataSoli.userId && dataSoli.userId > -1 ? await fetchApiSwr(api, option) : null;
  if (data) {
    await mutate("/user/token");
    await mutate("/user/amigos/" + dataSoli.userId);
  }
  return { dataRech: data };
}
export async function eliminarAmigo(id: number) {
  const api = "/user/amigos/" + id;
  const option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const dataElimAmigo = await fetchApiSwr(api, option);

  if (dataElimAmigo) {
    await mutate("/user/token");
    await mutate("/user/amigos/" + id);
  }
  return dataElimAmigo;
}
export async function likeODisLike(id: string) {
  const api = "/user/publicacion/" + id;
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const data = await fetchApiSwr(api, option);

  return data;
}
export async function comentarPublicacion(datas: any) {
  const api = "/user/publicacion/" + datas.id;
  const option = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ description: datas.description }),
  };
  const data = await fetchApiSwr(api, option);
  return data;
}
export async function EnviarMessage(datas: MessageUserChat) {
  const token = getCookie("token");
  const api = "/user/room";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(datas),
  };
  const data = token && datas.message ? await fetchApiSwr(api, option) : null;

  return data;
}
export async function generateCode() {
  const api = "/user/generateCode";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  const data = await fetchApiSwr(api, option);
  return data;
}
export async function verificateCode(code: string) {
  const api = "/user/verificateCode";
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ code }),
  };

  const data = await fetchApiSwr(api, option);
  return data;
}
export async function optimizarImage(dataUrl: string) {
  const optimizedBase64 = await urltoBlob(dataUrl);
  const optimizedBase = await compressAccurately(optimizedBase64, {
    size: 320,
    quality: 0.6,
  });
  const dataFinal = await filetoDataURL(optimizedBase);
  return dataFinal;
}
