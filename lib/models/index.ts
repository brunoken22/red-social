import {conn} from './conn';

conn.User.hasOne(conn.Auth);
conn.User.hasMany(conn.Publicar);
conn.User.hasMany(conn.SolicitudAmistad);

// export {conn.Auth, User, Publicar, SolicitudAmistad};
