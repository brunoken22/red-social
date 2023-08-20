import {User} from './user';
import {Auth} from './auth';
import {Publicar} from './publicacion';
import {SolicitudAmistad} from './solicitud-amistad';
User.hasOne(Auth);
User.hasMany(Publicar);
User.belongsToMany(User, {
  through: SolicitudAmistad,
  as: 'solicitante',
  foreignKey: 'solicitanteId',
});

export {Auth, User, Publicar};
