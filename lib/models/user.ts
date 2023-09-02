import {Model, DataTypes} from 'sequelize';

export function user(sequelize: any) {
  class User extends Model {}
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      img: DataTypes.STRING,
      amigos: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    {sequelize, modelName: 'user'}
  );
  return User;
}
