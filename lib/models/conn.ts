import {Sequelize} from 'sequelize';
import pg from 'pg';

const sequelize = new Sequelize(process.env.SEQUELIZE as string);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Error', error);
  }
})();
export {sequelize};
