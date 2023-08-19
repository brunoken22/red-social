import {sequelize} from './models/conn';
import './models';
sequelize.sync().then((res: any) => {
  console.log('data');
});
