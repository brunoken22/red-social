import {Model, DataTypes} from 'sequelize';
import {sequelize} from './conn';

export class Publicar extends Model {}
Publicar.init(
  {
    description: DataTypes.STRING,
    like: DataTypes.INTEGER,
    img: DataTypes.STRING,
    fecha: DataTypes.STRING,
    comentarios: DataTypes.ARRAY(DataTypes.JSON),
  },
  {sequelize, modelName: 'publicar'}
);
