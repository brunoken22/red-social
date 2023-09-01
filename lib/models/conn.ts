import {Sequelize} from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    max: 10, // Número máximo de conexiones en el grupo
    min: 0, // Número mínimo de conexiones en el grupo
    idle: 10000, // Tiempo máximo que una conexión puede estar inactiva (en milisegundos)
  },
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error(error);
}

export {sequelize};
