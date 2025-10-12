import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class ModulesModel extends AbstractModel<ModulesModel> {
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

        title: { type: DataTypes.STRING, unique: true },

        description: { type: DataTypes.STRING },
      },

      {
        sequelize,
        tableName: 'modules',
        timestamps: false,
        underscored: true,
      }
    );
  };
}
