import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class RolesModel extends AbstractModel<RolesModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: DataTypes.STRING, allowNull: false, unique: true },

        description: { type: DataTypes.STRING, allowNull: true },
      },

      {
        sequelize,
        tableName: 'roles',
        timestamps: false,
        underscored: true,
      }
    );
  };
}
