import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class PermissionsModel extends AbstractModel<PermissionsModel> {
  declare id: CreationOptional<number>;
  declare title: string;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: DataTypes.STRING, allowNull: false, unique: true },
      },

      {
        sequelize,
        tableName: 'permissions',
        timestamps: false,
        underscored: true,
      }
    );
  };
}
