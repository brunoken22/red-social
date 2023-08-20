import {Model, DataTypes} from 'sequelize';
import {sequelize} from './conn';

export class SolicitudAmistad extends Model {}
SolicitudAmistad.init(
  {
    estado: {
      type: DataTypes.ENUM('pendiente', 'aceptada'),
      defaultValue: 'pendiente',
    },
  },
  {sequelize, modelName: 'solicitudAmistad'}
);
