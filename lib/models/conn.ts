import {Sequelize} from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialect: 'postgres',
  dialectModule: pg,
  pool: {
    max: Infinity, // Número ilimitado de conexiones en el pool
    min: 0,
    idle: 10000,
  },
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error(error);
}

export {sequelize};
