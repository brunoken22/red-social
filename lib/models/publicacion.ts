import {Model, DataTypes} from 'sequelize';

export function publicacion(sequelize: any) {
  class Publicacion extends Model {}
  Publicacion.init(
    {
      description: DataTypes.STRING,
      like: DataTypes.INTEGER,
      img: DataTypes.STRING,
      fecha: DataTypes.STRING,
      comentarios: DataTypes.ARRAY(DataTypes.JSON),
    },
    {sequelize, modelName: 'publicar'}
  );
  return Publicacion;
}
