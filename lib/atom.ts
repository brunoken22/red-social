import {atom} from 'recoil';

export type Publicacion = {
  id: string;
  description: string;
  img: string;
  fecha: string;
  like: [];
  comentarios: [];
  userId: number;
  open?: boolean;
};

type Message = {
  read: boolean;
  rtdb: string;
};
export type Connect = {
  id: number;
  connect: boolean;
};
export type User = {
  id: number;
  fullName: string;
  email: string;
  img: string;
  rtdb: string[];
};
export const user = atom({
  key: 'user',
  default: {
    user: {
      id: '',
      email: '',
      fullName: '',
      img: '',
      amigos: [] as number[],
      rtdb: ([] as string[]) || null,
    },
    token: '',
  },
});

export const publicacionUser = atom({
  key: 'publicacionUser',
  default: [] as Publicacion[],
});

export const getAllUser = atom({
  key: 'geAllUser',
  default: [] as User[],
});
export const getAllAmigos = atom({
  key: 'getAllAmigos',
  default: [] as User[],
});
export const getAllUsersChat = atom({
  key: 'getAllUsersChat',
  default: [] as User[],
});
export const getSugerenciaAmigos = atom({
  key: 'getSugerenciaAmigos',
  default: [] as User[],
});
export const getAllSolicitudesRecibidas = atom({
  key: 'getAllSolicitudesRecibidas',
  default: [] as User[],
});

export const getAllSolicitudesEnviadas = atom({
  key: 'getAllSolicitudesEnviadas',
  default: [] as User[],
});

export const publicacionAmigos = atom({
  key: 'publicacionAmigos',
  default: [] as Publicacion[],
});
export const publicacionSearchUser = atom({
  key: 'publicacionSearchUser',
  default: [] as Publicacion[],
});
export const isMenssage = atom({
  key: 'isMenssage',
  default: [] as Message[],
});
export const notificacionesUser = atom({
  key: 'notificacionesUser',
  default: [] as Publicacion[],
});
export const isConnect = atom({
  key: 'isConnet',
  default: [] as Connect[],
});
