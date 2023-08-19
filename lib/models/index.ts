import {User} from './user';
import {Auth} from './auth';
import {Publicar} from './publicacion';

User.hasOne(Auth);
User.hasMany(Publicar);

export {Auth, User, Publicar};
