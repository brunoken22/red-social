import {Sequelize} from 'sequelize';
import pg from 'pg';

let sequelize = new Sequelize(process.env.SEQUELIZE as string, {
  dialectModule: pg,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
let conn = false;
(async () => {
  try {
    console.log('CONN', conn);
    if (!conn) {
      conn = true;
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    }
  } catch (error) {
    console.error('Error', error);
  }
})();
export {sequelize};
