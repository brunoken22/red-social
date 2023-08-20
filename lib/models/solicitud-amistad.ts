import {Model, DataTypes} from 'sequelize';
import {sequelize} from './conn';

export class SolicitudAmistad extends Model {}
SolicitudAmistad.init(
  {
    amigoId: DataTypes.INTEGER,
    estado: DataTypes.ENUM('pendiente', 'aceptada'),
    defaultValue: 'pendiente',
  },
  {sequelize, modelName: 'solicitudAmistad'}
);
