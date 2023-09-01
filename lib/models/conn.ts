import {Sequelize} from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialectModule: pg,
  pool: {
    max: 5, // Número máximo de conexiones en el grupo
    min: 0, // Número mínimo de conexiones en el grupo
    acquire: 30000, // Tiempo en milisegundos que una conexión puede esperar antes de lanzar un error
    idle: 10000, // Tiempo en milisegundos que una conexión puede estar inactiva antes de ser cerrada
  },
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error', error);
}

export {sequelize};
