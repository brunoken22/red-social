import {Model, DataTypes} from 'sequelize';

export function auth(sequelize: any) {
  class Auth extends Model {}

  Auth.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {sequelize, modelName: 'auth'}
  );
  return Auth;
}
