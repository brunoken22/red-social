import {Sequelize} from 'sequelize';
import pg from 'pg'; // Importa el controlador

const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    max: 1, // Número máximo de conexiones en el pool
    min: 0, // Número mínimo de conexiones en el pool
    idle: 10000, // Tiempo máximo (en milisegundos) que una conexión puede estar inactiva en el pool antes de ser eliminada
  },
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error');
}
export {sequelize};
