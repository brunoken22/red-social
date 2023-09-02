import {Model, DataTypes} from 'sequelize';

export function solicitudAmistad(sequelize: any) {
  class SolicitudAmistad extends Model {}
  SolicitudAmistad.init(
    {
      amigoId: DataTypes.INTEGER,
      estado: DataTypes.BOOLEAN,
    },
    {sequelize, modelName: 'solicitudAmistad'}
  );
  return SolicitudAmistad;
}
