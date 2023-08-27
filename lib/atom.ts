import {atom} from 'recoil';
type Publicacion = {
  id: string;
  description: string;
  img: string;
  fecha: string;
  like: 0;
  comentarios: [];
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
