import {atom} from 'recoil';
type Publicacion = {
  id: string;
  description: string;
  img: string;
  fecha: string;
  like: 0;
  comentarios: [];
  userId: number;
};
export type User = {
  id: number;
  fullName: string;
  email: string;
  img: string;
};
export const user = atom({
  key: 'user',
  default: {
    user: {
      id: '',
      email: '',
      fullName: '',
      img: '',
      amigos: '',
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
