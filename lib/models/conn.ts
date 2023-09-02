import {Sequelize} from 'sequelize';
import pg from 'pg';
import {auth} from './auth';
import {user} from './user';
import {publicacion} from './publicacion';
import {solicitudAmistad} from './solicitud-amistad';

export const conn: any = {
  initialized: false,
  connection,
};

async function connection() {
  const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
    dialectModule: pg,
    pool: {
      max: 1,
      min: 0,
      idle: 1000,
    },
  });
  conn.Auth = auth(sequelize);
  conn.User = user(sequelize);
  conn.Publicacion = publicacion(sequelize);
  conn.SolicitudAmistad = solicitudAmistad(sequelize);

  conn.initialized = true;
}
