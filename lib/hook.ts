import useSWR, {mutate} from 'swr';
import useSWRImmutable from 'swr/immutable';
import useSWRInfinite from 'swr/infinite';
import {fetchApiSwr} from './api';
import {useRecoilState, useSetRecoilState} from 'recoil';
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
} from '@/lib/atom';
import {useEffect} from 'react';
import {urltoBlob, filetoDataURL, compressAccurately} from 'image-conversion';
import {getCookie, setCookie} from 'cookies-next';

type DataUser = {
  fullName?: string;
  email?: string;
  password?: string;
  img?: string;
};
type DataPublicacion = {
  description: string;
  img: string;
  openSwr?: boolean;
};
type DataSingin = {
  email: string;
  password: string;
};
type Solicitud = {
  amigoId?: number;
  userId?: number;
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
export function CreateUser(dataUser: DataUser) {
  const api = '/auth';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify(dataUser),
  };
  const {data, isLoading} = useSWR(
    dataUser.email && dataUser.password && dataUser.fullName ? api : null,
    (url) => fetchApiSwr(url, option)
  );
  if (data?.user?.id) {
    setCookie('login', true);
  }
  return {data, isLoading};
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

  const {data, isLoading} = useSWR(api, (url) => fetchApiSwr(url, option), {
    refreshInterval: 10000,
  });
  useEffect(() => {
    if (data?.getUserRes?.id) {
      setUserData({
        user: {
          ...data.getUserRes,
        },
      });

      // setPublicacionesUser([...data.getUserRes.publicacions]);
      setAmigosAllData(data.friendsAccepted);
      setGetAllUserData(data.getAllUserRes);
      setGetSugerenciaAmigosData(data.getAllUserSugeridos);
      setSoliAllEnv(data.friendEnv);
      setSoliAllReci(data.friendReci);
    }
  }, [data]);
  return {data, isLoading};
}
export function NotificacionesUser(offset: number) {
  const [notificacionesUserAtom, setNotificacionesUserAtom] =
    useRecoilState(notificacionesUser);
  const api = `/user/notificaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const token = getCookie('login');
  const {data, isLoading} = useSWR(
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
      if (
        notificacionesUserAtom &&
        notificacionesUserAtom.publicacion.length &&
        offset !== 0
      ) {
        setNotificacionesUserAtom(() => ({
          publicacion: [
            ...notificacionesUserAtom.publicacion,
            ...data?.publications,
          ],
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

  const {data, isLoading} = useSWRImmutable(
    token == 'true' ? api : null,
    (url) => fetchApiSwr(url, option)
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
export function GetAllPublicaciones() {
  const setPublicacionesAllAmigos = useSetRecoilState(publicacionAmigos);
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {data, isLoading, setSize, size} = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/user/amigos/publicaciones?offset=${pageIndex * 10}`;
    },
    (api) => fetchApiSwr(api, option),
    {
      revalidateAll: true,
    }
  );

  useEffect(() => {
    if (data && data[0]) {
      const flatArray = data.flat();
      setPublicacionesAllAmigos(flatArray);
    }
  }, [data]);

  return {
    dataPubliAllAmigosSwr: data,
    isLoadingAllAmigos: isLoading,
    setSize,
    size,
  };
}
export function GetAllPublicacionesUser() {
  const setPublicacionesUser = useSetRecoilState(publicacionUser);

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const {data, isLoading, setSize, size} = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/user/publicacion?offset=${pageIndex * 10}`;
    },
    (api) => fetchApiSwr(api, option),
    {}
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

  const {data, isLoading, setSize, size} = useSWRInfinite(
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

  return {dataPubliAmigo: data, isLoadingGetFriend: isLoading, setSize, size};
}
export function DeletePublic(id: number) {
  const [publicacionesUser, setPublicacionesUser] =
    useRecoilState(publicacionUser);
  const api = '/user/publicacion/' + id;
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  const {data, isLoading} = useSWR(id > -1 ? api : null, (url) =>
    fetchApiSwr(url, option)
  );
  useEffect(() => {
    if (data) {
      const newPublic =
        publicacionesUser &&
        publicacionesUser.filter((publi: Publicacion) => publi.id != id);
      setPublicacionesUser(newPublic);
    }
  }, [data]);

  return {dataDelete: data, isLoadingDeletePubli: isLoading};
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

  const {data, isLoading} = useSWR(api, (url) => fetchApiSwr(url, option), {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    refreshInterval: 100000,
  });

  return {data, isLoading};
}
export async function CreatePublicacion(dataPubli: DataPublicacion) {
  const api = '/user/publicacion';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify(dataPubli),
  };
  const dataNotiSwr = await fetchApiSwr(api, option);
  if (dataNotiSwr) {
    await mutate(`/user/publicacion?offset=0`);
  }

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

  return {dataCreateSoli: data};
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
  const data =
    dataSoli.userId && dataSoli.userId > -1
      ? await fetchApiSwr(api, option)
      : null;
  if (data) {
    await mutate('/user/token');
    await mutate('/user/amigos/' + dataSoli.userId);
  }
  return {dataRech: data};
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
    body: JSON.stringify({description: datas.description}),
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
  const {data, isLoading} = useSWR(
    token && id ? api : null,
    (url) => fetchApiSwr(url, option),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: 100000,
    }
  );
  return {dataPubliId: data, isLoadGetPubliId: isLoading};
}
export function EnviarMessage(datas: any) {
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
  const {data, isLoading} = useSWR(
    token == 'true' && datas.message ? api : null,
    (url) => fetchApiSwr(url, option),
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );
  return {dataMesssage: data, isLoadMessage: isLoading};
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
    body: JSON.stringify({code}),
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
