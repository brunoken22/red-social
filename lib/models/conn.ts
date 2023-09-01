const Sequelize = require('sequelize');
import pg from 'pg'; // Importa el controlador
const sequelize = new Sequelize(process.env.SEQUELIZE as string);
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Error');
}

export {sequelize};
