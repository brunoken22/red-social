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
} from '@/lib/atom';
import {useEffect} from 'react';
import {urltoBlob, filetoDataURL, compressAccurately} from 'image-conversion';
import {Loader} from '@/components/loader';
const token =
  typeof window !== 'undefined'
    ? (localStorage.getItem('token') as string)
    : '';
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
  const {data, isLoading, error} = useSWRImmutable(
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
    fetchApiSwr
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
  const {data, isLoading, error} = useSWR(
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
  const [publicaciones, setPublicaciones] = useRecoilState(publicacionUser);
  const [getAllUserData, setGetAllUserData] = useRecoilState(getAllUser);
  const [amigoAllData, setAmigosAllData] = useRecoilState(getAllAmigos);
  const [soliAllEnv, setSoliAllEnv] = useRecoilState(getAllSolicitudesEnviadas);
  const [publicanionesAmigos, setPublicanionesAmigos] =
    useRecoilState(publicacionAmigos);

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
  const {data, isLoading, error} = useSWR(
    token ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnMount: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 1000,
    }
  );

  useEffect(() => {
    if (data?.getUserRes?.id) {
      setUserData({
        token,
        user: {
          ...data.getUserRes,
        },
      });
      const datapubliUser = data.getAllPulicacionRedAmigosRes.filter(
        (dataPubli: any) => dataPubli.userId == data?.getUserRes?.id
      );
      setPublicaciones(datapubliUser);
      setGetAllUserData(data.getAllUserRes);
      setAmigosAllData(data.getAllAmigosRes);
      setSoliAllEnv(data.getSolicitudAmistadRes?.usersEnv);
      setSoliAllReci(data.getSolicitudAmistadRes?.usersReci);
      setPublicanionesAmigos(data.getAllPulicacionRedAmigosRes);
    }
  }, [data]);

  return {data, isLoading};
}
export function GetAmigo(id: string) {
  const api = '/user/amigos/' + id;
  const option = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data, isLoading, error} = useSWRImmutable(
    token && id ? [api, option] : null,
    fetchApiSwr,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      refreshInterval: 10000,
    }
  );
  return {data, isLoading};
}
export function CreatePublicacion(dataPubli: DataPublicacion, token: string) {
  const api = '/user/publicar';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataPubli),
  };
  const {data, isLoading, error} = useSWRImmutable(
    dataPubli.id !== 0 ? [api, option] : null,
    fetchApiSwr
  );
  return {data, isLoading};
}
export function CreateSolicitud(dataSoli: Solicitud) {
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
  const {data, isLoading, error} = useSWR(
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
export function AceptarSolicitud(dataSoli: Solicitud) {
  const api = '/user/amigos';
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSoli),
  };
  const {data, isLoading, error} = useSWR(
    dataSoli.amigoId > -1 ? [api, option] : null,
    fetchApiSwr
  );

  return {dataAcep: data, isLoadingAcep: isLoading};
}
export function RechazarSolicitud(dataSoli: any) {
  const api = '/user/solicitudAmistad';
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSoli),
  };
  const {data, isLoading, error} = useSWR(
    dataSoli.userId > -1 ? [api, option] : null,
    fetchApiSwr
  );

  return {dataRech: data, isLoadingRech: isLoading};
}
export function EliminarAmigo(datas: any) {
  const api = '/user/amigos';
  const option = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(datas),
  };
  const {data, isLoading, error} = useSWR(
    token && datas.userId > -1 ? [api, option] : null,
    fetchApiSwr
  );

  return {dataElimAmigo: data, isLoadingElimAmigo: isLoading};
}
export function OptimizarImage(dataUrl: string) {
  const {data, isLoading, error} = useSWR(
    dataUrl ? dataUrl : null,
    async (dataUrl) => {
      const optimizedBase64 = await urltoBlob(dataUrl);
      const optimizedBase = await compressAccurately(optimizedBase64, {
        size: 520,
        quality: 0.8,
      });

      const dataFinal = await filetoDataURL(optimizedBase);
      var data = dataFinal.split(',')[1];
      var decodedData = atob(data);

      var sizeInMB = decodedData.length / (1024 * 1024);

      console.log('Tamaño de la imagen: ' + sizeInMB.toFixed(2) + ' MB');
      return dataFinal;
    }
  );
  return {data, isLoading};
}
