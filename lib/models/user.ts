import {Model, DataTypes} from 'sequelize';
import {sequelize} from './conn';

export class User extends Model {}
User.init(
  {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    img: DataTypes.STRING,
    amigos: DataTypes.ARRAY(DataTypes.INTEGER),
  },
  {sequelize, modelName: 'user'}
);
