import {Sequelize} from 'sequelize';
import pg from 'pg'; // Importa el controlador
const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    max: 1, // Mantén un solo conjunto de conexión en el pool
    min: 0,
    idle: 10000,
  },
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error');
}

export {sequelize};
