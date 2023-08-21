import {atom} from 'recoil';

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
