import {Sequelize} from 'sequelize';
import pg from 'pg'; // Importa el controlador

const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialect: 'postgres',
  dialectModule: pg,
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error');
}

export {sequelize};
