import {sequelize} from './models/conn';
import './models';

sequelize.sync({force: true}).then((res: any) => {
  console.log(res);
});
