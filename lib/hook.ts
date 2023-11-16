import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';
import {fetchApiSwr} from './api';
import {useRecoilState} from 'recoil';
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
} from '@/lib/atom';
import {useEffect} from 'react';
import {urltoBlob, filetoDataURL, compressAccurately} from 'image-conversion';

type DataUser = {
  fullName?: string;
  email?: string;
  password?: string;
  img?: string;
};
type DataPublicacion = {
  id: number;
  description: string;
  like: number;
  img: string;
  comentarios: [];
  fecha: string;
};
type DataSingin = {
  email: string;
  password: string;
};
type Solicitud = {
  amigoId: number;
  estado: boolean;
  userId?: number;
};
export function CreateUser(dataUser: DataUser) {
  const api = '/auth';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  };
  const {data, isLoading} = useSWRImmutable(
    dataUser.email ? [api, option] : null,
    fetchApiSwr
  );
  return {data, isLoading};
}
export function SigninUser(dataUser: DataSingin) {
  const [userData, setUserData] = useRecoilState(user);
  const api = '/signin';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataUser),
  };
  const {data, isLoading, error} = useSWR(
    dataUser.email ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnReconnect: true,
    }
  );
  useEffect(() => {
    setUserData(data ? data : null);
  }, [data]);
  return {data, isLoading};
}
export function ModificarUser(dataUser: DataUser, token: string) {
  const [userData, setUserData] = useRecoilState(user);
  const api = '/user/token';
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataUser),
  };
  const {data, isLoading} = useSWR(
    dataUser?.email || dataUser?.password || dataUser?.img
      ? [api, option]
      : null,
    fetchApiSwr
  );

  useEffect(() => {
    if (data?.user?.img) {
      const newUserData = {
        ...userData,
        user: {
          ...userData?.user,
          img: data?.user.img,
        },
      };
      setUserData(newUserData);
      return;
    }
    if (data && dataUser?.email) {
      const newUserData = {
        ...userData,
        user: {
          ...userData?.user,
          fullName: dataUser.fullName || '',
          email: dataUser.email || '',
        },
      };
      setUserData(newUserData);
    }
  }, [data]);
  return {data, isLoading};
}
export function GetUser(token: string) {
  const [userData, setUserData] = useRecoilState(user);
  const [getAllUserData, setGetAllUserData] = useRecoilState(getAllUser);
  const [soliAllEnv, setSoliAllEnv] = useRecoilState(getAllSolicitudesEnviadas);
  const [soliAllReci, setSoliAllReci] = useRecoilState(
    getAllSolicitudesRecibidas
  );

  const api = '/user/token';
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data, isLoading} = useSWR(token ? [api, option] : null, fetchApiSwr, {
    revalidateOnMount: true,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 50000,
  });

  useEffect(() => {
    if (data?.getUserRes?.id) {
      setUserData({
        token,
        user: {
          ...data.getUserRes,
        },
      });

      setGetAllUserData(data.getAllUserRes);
      setSoliAllEnv(data.getSolicitudAmistadRes?.usersEnv);
      setSoliAllReci(data.getSolicitudAmistadRes?.usersReci);
    }
  }, [data]);

  return {data, isLoading};
}
export function NotificacionesUser(token: string, offset: number) {
  const [notificacionesUserAtom, setNotificacionesUserAtom] =
    useRecoilState(notificacionesUser);
  const api = `/user/notificaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const {data, isLoading} = useSWR(token ? [api, option] : null, fetchApiSwr, {
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    refreshInterval: 100000,
  });

  useEffect(() => {
    if (data) {
      if (notificacionesUserAtom.length > 0 && offset !== 0) {
        setNotificacionesUserAtom((prev: any) => [
          ...prev,
          ...data.publicacion,
        ]);
        return;
      }
      setNotificacionesUserAtom([...data?.publicacion]);
    }
  }, [data]);

  return {
    dataNotiSwr: data,
    isLoadingNotiSwr: isLoading,
  };
}
export function NotificacionesUserImmutable(token: string, offset: number) {
  const [notificacionesUserAtom, setNotificacionesUserAtom] =
    useRecoilState(notificacionesUser);
  const api = `/user/notificaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const {data, isLoading} = useSWRImmutable(
    token ? [api, option] : null,
    fetchApiSwr
  );

  useEffect(() => {
    if (data) {
      setNotificacionesUserAtom([...data?.publicacion]);
      return;
    }
  }, [data]);

  return {
    dataNotiSwr: data,
    isLoadingNotiSwr: isLoading,
  };
}
export function GetAllAmigos(token: string) {
  const [amigoAllData, setAmigosAllData] = useRecoilState(getAllAmigos);
  const api = `/user/amigos`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data, isLoading} = useSWRImmutable(
    token ? [api, option] : null,
    fetchApiSwr
  );

  useEffect(() => {
    if (data) {
      setAmigosAllData(data);
    }
  }, [data]);

  return {dataAllAmigosSwr: data, isLoadingAllAmigos: isLoading};
}
export function GetAllPublicaciones(token: string, offset: number) {
  const [publicacionesAllAmigos, setPublicacionesAllAmigos] =
    useRecoilState(publicacionAmigos);
  const api = `/user/amigos/publicaciones?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const {data, isLoading} = useSWR(token ? [api, option] : null, fetchApiSwr, {
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    refreshInterval: 100000,
  });

  useEffect(() => {
    if (data?.length) {
      if (publicacionesAllAmigos.length > 0 && offset !== 0) {
        setPublicacionesAllAmigos((prev: any) => [...prev, ...data]);
        return;
      }
      setPublicacionesAllAmigos([...data]);
    }
  }, [data]);

  return {
    dataPubliAllAmigosSwr: data,
    isLoadingAllAmigos: isLoading,
  };
}
export function GetAllPublicacionesUser(token: string, offset: number) {
  const [publicacionesUser, setPublicacionesUser] =
    useRecoilState(publicacionUser);
  const api = `/user/publicacion?offset=${offset}`;

  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data, isLoading, error} = useSWR(
    token ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      refreshInterval: 100000,
    }
  );

  useEffect(() => {
    if (data) {
      if (publicacionesUser.length > 0 && offset !== 0) {
        setPublicacionesUser((prev: any) => [...prev, ...data]);
        return;
      }
      setPublicacionesUser([...data]);
    }
  }, [data]);

  return {dataPubliAllAmigosSwr: data, isLoadingAllAmigos: isLoading};
}
export function GetPubliAmigo(id: string, token: string, offset: number) {
  const [publicacionesAmigo, setPublicacionesAmigo] = useRecoilState(
    publicacionSearchUser
  );
  const api = `/user/amigos/publicaciones/${id}?offset=${offset}`;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const {data, isLoading} = useSWR(token ? [api, option] : null, fetchApiSwr, {
    revalidateOnReconnect: true,
    revalidateOnMount: true,
    revalidateOnFocus: true,
    refreshInterval: 100000,
  });
  useEffect(() => {
    if (data) {
      if (publicacionesAmigo.length > 0 && offset !== 0) {
        setPublicacionesAmigo((prev: any) => [...prev, ...data]);
        return;
      }
      setPublicacionesAmigo([...data]);
    }
  }, [data]);

  return {dataPubliAmigo: data, isLoading};
}
export function DeletePublic(token: string, id: number) {
  const [publicacionesUser, setPublicacionesUser] =
    useRecoilState(publicacionUser);
  const api = '/user/publicacion';
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({id}),
  };
  const {data, isLoading} = useSWR(id > -1 ? [api, option] : null, fetchApiSwr);
  useEffect(() => {
    if (data) {
      const newPublic = publicacionesUser.filter(
        (publi: Publicacion) => publi.id != id.toString()
      );
      setPublicacionesUser(newPublic);
    }
  }, [data]);

  return {dataDelete: data, isLoadingDeletePubli: isLoading};
}
export function GetAmigo(id: string, token: string) {
  const api = `/user/amigos/${id}`;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const {data, isLoading} = useSWR(
    token && id ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {data, isLoading};
}
export function CreatePublicacion(dataPubli: DataPublicacion, token: string) {
  const api = '/user/publicacion';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataPubli),
  };
  const {data, isLoading} = useSWRImmutable(
    dataPubli.id !== 0 ? [api, option] : null,
    fetchApiSwr
  );
  return {data, isLoading};
}
export function CreateSolicitud(dataSoli: Solicitud, token: string) {
  const [userAllData, setUserAllData] = useRecoilState(
    getAllSolicitudesEnviadas
  );
  const api = '/user/solicitudAmistad';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSoli),
  };
  const {data, isLoading} = useSWR(
    dataSoli.amigoId > -1 ? [api, option] : null,
    fetchApiSwr
  );
  useEffect(() => {
    if (data) {
      const soli = userAllData ? userAllData : [];
      setUserAllData([...soli, data]);
    }
  }, [data]);
  return {dataCreateSoli: data, isLoadCreateSoli: isLoading};
}
export function AceptarSolicitud(dataSoli: Solicitud, token: string) {
  const api = '/user/amigos';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(dataSoli),
  };
  const {data, isLoading} = useSWR(
    dataSoli.amigoId > -1 ? [api, option] : null,
    fetchApiSwr
  );

  return {dataAcep: data, isLoadingAcep: isLoading};
}
export function RechazarSolicitud(dataSoli: any, token: string) {
  const api = '/user/solicitudAmistad';
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSoli),
  };
  const {data, isLoading} = useSWR(
    dataSoli.userId > -1 ? [api, option] : null,
    fetchApiSwr
  );

  return {dataRech: data, isLoadingRech: isLoading};
}
export function EliminarAmigo(datas: any, token?: string) {
  const api = '/user/amigos';
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datas),
  };
  const {data, isLoading} = useSWR(
    token && datas.userId > -1 ? [api, option] : null,
    fetchApiSwr
  );
  return {dataElimAmigo: data, isLoadingElimAmigo: isLoading};
}
export function LikeODisLike(datas: any, token: string) {
  const api = '/user/publicacion/' + datas.id;
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({tipo: datas.tipo}),
  };

  const {data, isLoading} = useSWR(
    token && datas.click ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );

  return {dataLike: data, isLoadingLike: isLoading};
}
export function ComentarPublicacion(datas: any, token: string) {
  const api = '/user/publicacion/' + datas.id;
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({...datas}),
  };
  const {data, isLoading} = useSWRImmutable(
    token && datas.click ? [api, option] : null,
    fetchApiSwr
  );

  return {dataComentar: data, isLoadingComentar: isLoading};
}
export function GetPublicacionId(token: string, id: string) {
  const api = '/user/publicacion/' + id;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data, isLoading} = useSWR(
    token && id ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: 100000,
    }
  );
  return {dataPubliId: data, isLoadGetPubliId: isLoading};
}
export function EnviarMessage(datas: any, token?: string) {
  const api = '/user/room';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datas),
  };
  const {data, isLoading, error} = useSWRImmutable(
    token && datas.message && datas.rtdb ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnReconnect: true,
      revalidateOnMount: true,
    }
  );
  return {dataMesssage: data, isLoadMessage: isLoading};
}
export function OptimizarImage(dataUrl: string) {
  const {data, isLoading} = useSWR(
    dataUrl ? dataUrl : null,
    async (dataUrl) => {
      const optimizedBase64 = await urltoBlob(dataUrl);
      const optimizedBase = await compressAccurately(optimizedBase64, {
        size: 320,
        quality: 0.6,
      });
      const dataFinal = await filetoDataURL(optimizedBase);
      return dataFinal;
    }
  );
  return {dataObtimizado: data, isLoading};
}
