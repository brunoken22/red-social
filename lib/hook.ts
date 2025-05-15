import useSWR, { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
import { fetchApiSwr } from './api';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  user,
  publicacionUser,
  getAllUser,
  getAllSolicitudesRecibidas,
  getAllAmigos,
  getAllSolicitudesEnviadas,
  publicacionAmigos,
  publicacionSearchUser,
  notificacionesUser,
  Publicacion,
  getSugerenciaAmigos,
  User,
} from '@/lib/atom';
import { useEffect, useState } from 'react';
import { urltoBlob, filetoDataURL, compressAccurately } from 'image-conversion';
import { getCookie, setCookie } from 'cookies-next';
import { MessageUserChat } from '@/components/templateMensaje';

type DataUser = {
  fullName?: string;
  email?: string;
  password?: string;
  img?: string;
  accessToken?: JWT;
  code?: string;
};
type DataSingin = {
  email: string;
  password: string;
};
type Solicitud = {
  amigoId?: number;
  userId?: number;
};
import { getDatabase, ref, onValue, onDisconnect, set } from 'firebase/database';
import { JWT } from 'next-auth/jwt';

export async function userConnectPushPWA(userConnect: any) {
  const option = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(userConnect),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const subscribe = await fetchApiSwr('/subscribe', option);
  return subscribe;
}
export async function userDisconnectPushPWA(userConnect: any) {}
export const useConnectionStatus = (user: User) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    const db = getDatabase();
    const userStatusRef = ref(db, `/connect/${user.id}`);
    const connectedRef = ref(db, '.info/connected');

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
        // Marcar como conectado
        set(userStatusRef, isOnline);
        // Configurar onDisconnect para marcar como desconectado
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
  const api = '/log-out';
  const option = {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const data = await fetchApiSwr(api, option);
  if (data) {
    setCookie('login', false);
  }
  return data;
}
export async function CreateOrLoginGoogle(dataUser: DataUser) {
  const api = '/auth-google';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataUser),
  };
  const data = dataUser.email && dataUser.fullName ? await fetchApiSwr(api, option) : null;

  if (data?.user?.id) {
    setCookie('login', true);
  }
  return data;
}
export async function CreateUser(dataUser: DataUser) {
  const api = '/auth';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify(dataUser),
  };
  const data =
    dataUser.email && dataUser.password && dataUser.fullName
      ? await fetchApiSwr(api, option)
      : null;

  if (data?.user?.id) {
    setCookie('login', true);
  }
  return data;
}
export async function signinUser(dataUser: DataSingin) {
  const api = '/signin';
  const option = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  };
  const data = dataUser.email ? await fetchApiSwr(api, option) : null;
  if (data?.id) {
    setCookie('login', true);
  }
  return data;
}
export async function modificarUser(dataUser: DataUser) {
  const api = '/user/token';
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataUser),
  };

  const dataMod =
    dataUser?.fullName || dataUser?.email || dataUser?.password || dataUser?.img
      ? await fetchApiSwr(api, option)
      : null;

  if (dataMod) {
    await mutate('/user/token');
  }
  return dataMod;
}
export async function sendResetPassword(dataUser: DataUser) {
  const api = '/user/send-reset-password';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export async function validationResetPassword(dataUser: DataUser) {
  const api = '/user/validation-reset-password';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email && dataUser.code ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export async function resetPassword(dataUser: DataUser) {
  const api = '/user/reset-password';
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(dataUser),
  };
  const dataMod = dataUser?.email && dataUser.password ? await fetchApiSwr(api, option) : null;
  return dataMod;
}
export function GetUser() {
  const setUserData = useSetRecoilState(user);
  const setGetAllUserData = useSetRecoilState(getAllUser);
  const setAmigosAllData = useSetRecoilState(getAllAmigos);
  const setGetSugerenciaAmigosData = useSetRecoilState(getSugerenciaAmigos);
  const setSoliAllEnv = useSetRecoilState(getAllSolicitudesEnviadas);
  const setSoliAllReci = useSetRecoilState(getAllSolicitudesRecibidas);
  const token = getCookie('login');
  const api = '/user/token';
  const option = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data, isLoading } = useSWR(
    token == 'true' ? api : null,
    (url) => fetchApiSwr(url, option),
    {
      refreshInterval: 100000,
    }
  );
  useEffect(() => {
    if (data?.getUserRes?.id) {
      setUserData({
        isLoading: false,
        user: {
          ...data.getUserRes,
        },
      });

      // setPublicacionesUser([...data.getUserRes.publicacions]);
      setAmigosAllData({ isLoading: false, data: data.friendsAccepted });
      setGetAllUserData(data.getAllUserRes);
      setGetSugerenciaAmigosData(data.getAllUserSugeridos);
      setSoliAllEnv(data.friendEnv);
      setSoliAllReci(data.friendReci);
      return;
    }
  }, [data]);
  return { data, isLoading };
}
export function GetAllUserChat() {
  const token = getCookie('login');
  const api = '/user/chat-users';
  const option = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data, isLoading } = useSWR(
    token === 'true' ? api : null,
    (url) => fetchApiSwr(url, option),
    {
      refreshInterval: 10000,
    }
  );

  return { data, isLoading };
}
export function NotificacionesUser(offset: number) {
  const [notificacionesUserAtom, setNotificacionesUserAtom] = useRecoilState(notificacionesUser);
  const api = `/user/notificaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const token = getCookie('login');
  const { data, isLoading } = useSWR(
    token == 'true' ? api : null,
    (api) => fetchApiSwr(api, option),
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    if (data && data?.publications) {
      if (notificacionesUserAtom && notificacionesUserAtom.publicacion.length && offset !== 0) {
        setNotificacionesUserAtom(() => ({
          publicacion: [...notificacionesUserAtom.publicacion, ...data?.publications],
          newPubliOPen: data.newPubliOPen + notificacionesUserAtom.newPubliOPen,
        }));
        return;
      }
      setNotificacionesUserAtom({
        publicacion: [...data?.publications],
        newPubliOPen: data.newPubliOPen,
      });
    }
  }, [data]);

  return {
    dataNotiSwr: data?.publications,
    isLoadingNotiSwr: isLoading,
  };
}
export function NotificacionesUserImmutable(offset: number) {
  const setNotificacionesUserAtom = useSetRecoilState(notificacionesUser);
  const token = getCookie('login');
  const api = `/user/notificaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const { data, isLoading } = useSWRImmutable(token == 'true' ? api : null, (url) =>
    fetchApiSwr(url, option)
  );

  useEffect(() => {
    if (data) {
      setNotificacionesUserAtom({
        publicacion: [...data?.publications],
        newPubliOPen: data.newPubliOPen,
      });
      return;
    }
  }, [data]);

  return {
    dataNotiSwr: data,
    isLoadingNotiSwr: isLoading,
  };
}
export async function viewNotification(idPublication: string) {
  const api = `/user/notificaciones/${idPublication}`;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const data = await fetchApiSwr(api, option);
  await mutate('/user/notificaciones?offset=0');
  return data;
}
export function GetAllPublicaciones(isMutate = false) {
  const setPublicacionesAllAmigos = useSetRecoilState(publicacionAmigos);

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const { data, isLoading, setSize, size, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length && isMutate) return null;
      return `/user/publicacion?offset=${pageIndex * 10}`;
    },
    (api) => fetchApiSwr(api, option)
  );
  useEffect(() => {
    if (data?.length) {
      const flatArray = data.flat();
      setPublicacionesUser(flatArray);
    }
  }, [data]);

  return {
    dataPubliAllAmigosSwr: data,
    isLoading,
    setSize,
    size,
    mutatePublicacionesUser: mutate,
  };
}
export function GetPubliAmigo(id: string) {
  const setPublicacionesAmigo = useSetRecoilState(publicacionSearchUser);

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const { data, isLoading, setSize, size, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/user/amigos/publicaciones/${id}?offset=${pageIndex * 10}`;
    },
    (api) => fetchApiSwr(api, option),
    {}
  );
  useEffect(() => {
    if (data?.length) {
      const flatArray = data.flat();
      setPublicacionesAmigo(flatArray);
    }
  }, [data]);

  return {
    dataPubliAmigo: data,
    isLoadingGetFriend: isLoading,
    setSize,
    size,
    mutatePublicacionesUser: mutate,
  };
}
export function DeletePublic(id: number) {
  const [publicacionesUser, setPublicacionesUser] = useRecoilState(publicacionUser);
  const api = '/user/publicacion/' + id;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const { data, isLoading } = useSWR(id > -1 ? api : null, (url) => fetchApiSwr(url, option));
  useEffect(() => {
    if (data) {
      const newPublic =
        publicacionesUser && publicacionesUser.filter((publi: Publicacion) => publi.id != id);
      setPublicacionesUser(newPublic);
    }
  }, [data]);

  return { dataDelete: data, isLoadingDeletePubli: isLoading };
}
export function GetAmigo(id: string) {
  const api = `/user/amigos/${id}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const { data, isLoading } = useSWR(api, (url) => fetchApiSwr(url, option), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    refreshInterval: 100000,
  });

  return { data, isLoadingDataUserId: isLoading };
}
export async function CreatePublicacion(dataPubli: { description: string; img: File[] }) {
  const api = '/user/publicacion';
  const formData = new FormData();

  // Agregamos la descripción
  formData.append('description', dataPubli.description);

  // Agregamos las imágenes (pueden ser múltiples)
  dataPubli.img.forEach((file) => {
    formData.append('images', file); // 'images' debe coincidir con el nombre que espera Multer en el backend
  });

  const option = {
    method: 'POST',
    credentials: 'include',
    body: formData,
  };

  const dataNotiSwr = await fetchApiSwr(api, option);
  return dataNotiSwr;
}
export async function createSolicitud(dataSoli: Solicitud) {
  const api = '/user/solicitudAmistad/' + dataSoli.amigoId;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const shouldFetch = dataSoli.amigoId && dataSoli.amigoId >= 1;
  const data = shouldFetch ? await fetchApiSwr(api, option) : null;

  if (data) {
    await mutate('/user/token');
    await mutate('/user/amigos/' + dataSoli.amigoId);
  }

  return { dataCreateSoli: data };
}
export async function aceptarSolicitud(id: number) {
  const api = '/user/amigos/' + id;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const data = await fetchApiSwr(api, option);
  if (data) {
    await mutate('/user/token');
  }
  return data;
}
export async function rechazarSolicitud(dataSoli: Solicitud) {
  const api = '/user/solicitudAmistad/' + dataSoli.userId;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const data = dataSoli.userId && dataSoli.userId > -1 ? await fetchApiSwr(api, option) : null;
  if (data) {
    await mutate('/user/token');
    await mutate('/user/amigos/' + dataSoli.userId);
  }
  return { dataRech: data };
}
export async function eliminarAmigo(id: number) {
  const api = '/user/amigos/' + id;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const dataElimAmigo = await fetchApiSwr(api, option);

  if (dataElimAmigo) {
    await mutate('/user/token');
    await mutate('/user/amigos/' + id);
  }
  return dataElimAmigo;
}
export async function likeODisLike(id: string) {
  const api = '/user/publicacion/' + id;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const data = await fetchApiSwr(api, option);

  return data;
}
export async function comentarPublicacion(datas: any) {
  const api = '/user/publicacion/' + datas.id;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ description: datas.description }),
  };
  const data = await fetchApiSwr(api, option);
  return data;
}
export function GetPublicacionId(id: string) {
  const token = getCookie('login');
  const api = '/user/publicacion/' + id;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const { data, isLoading, mutate } = useSWR(
    token && id ? api : null,
    (url) => fetchApiSwr(url, option),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: 100000,
    }
  );
  return { dataPubliId: data, isLoadGetPubliId: isLoading, mutatePublicacionesUser: mutate };
}
export async function EnviarMessage(datas: MessageUserChat) {
  const token = getCookie('login');
  const api = '/user/room';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(datas),
  };
  const data = token == 'true' && datas.message ? await fetchApiSwr(api, option) : null;

  return data;
}
export async function generateCode() {
  const api = '/user/generateCode';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const data = await fetchApiSwr(api, option);
  return data;
}
export async function verificateCode(code: string) {
  const api = '/user/verificateCode';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
