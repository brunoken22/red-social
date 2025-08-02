import { atom } from 'recoil';

export type Publicacion = {
  id: number;
  description: string;
  img: string[];
  createdAt: string;
  updatedAt: string;
  likePublics: [];
  commentPublis: { user: User }[];
  userId: number;
  open?: boolean;
  user: User;
};

export type Message = {
  read: boolean;
  rtdb: string;
  message: string;
  id: number;
};

export type MessageWriting = {
  id: number;
  writing: boolean;
};

export type NotificationPublication = {
  type: 'like' | 'comment' | 'reply';
  user_id: Number;
  publicacionId: Number;
  fromUser: Number;
  img: string;
  fullName: string;
  read: boolean;
  descriptionReduce?: string;
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
    isLoading: true,
    user: {
      id: 0,
      email: '',
      fullName: '',
      verification: false,
      google: false,
      img: '',
      amigos: [] as number[],
      rtdb: [] as string[],
    },
  },
});

export const publicacionUser = atom<Publicacion[] | null>({
  key: 'publicacionUser',
  default: null,
});

export const getAllAmigos = atom({
  key: 'getAllAmigos',
  default: {
    isLoading: true,
    data: [] as User[],
  },
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
export const messagesWriting = atom({
  key: 'isMenssageWriting',
  default: [] as MessageWriting[],
});
export const notificacionesUser = atom<{
  publicacion: NotificationPublication[];
  newPubliOPen: number;
}>({
  key: 'notificacionesUser',
  default: {
    publicacion: [],
    newPubliOPen: 0,
  },
});
export const isConnect = atom({
  key: 'isConnet',
  default: [] as Connect[],
});
