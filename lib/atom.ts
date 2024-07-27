import {atom} from 'recoil';

export type Publicacion = {
  id: number;
  description: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  likePublics: [];
  commentPublis: {user: User}[];
  userId: number;
  open?: boolean;
  user: User;
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
  amigos: number[];
  verification: boolean;
  rtdb: string[];
};
export const user = atom({
  key: 'user',
  default: {
    user: {
      id: 0,
      email: '',
      fullName: '',
      verification: false,
      img: '',
      amigos: [] as number[],
      rtdb: ([] as string[]) || null,
    },
  },
});

export const publicacionUser = atom<Publicacion[] | null>({
  key: 'publicacionUser',
  default: null,
});

export const getAllUser = atom({
  key: 'geAllUser',
  default: [] as User[],
});
export const getAllAmigos = atom({
  key: 'getAllAmigos',
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

export const publicacionAmigos = atom<Publicacion[] | null>({
  key: 'publicacionAmigos',
  default: null,
});
export const publicacionSearchUser = atom<Publicacion[] | null>({
  key: 'publicacionSearchUser',
  default: null,
});
export const isMenssage = atom({
  key: 'isMenssage',
  default: [] as Message[],
});
export const notificacionesUser = atom<{
  publicacion: Publicacion[];
  newPubliOPen: number;
} | null>({
  key: 'notificacionesUser',
  default: null,
});
export const isConnect = atom({
  key: 'isConnet',
  default: [] as Connect[],
});
