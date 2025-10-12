import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { UsersModel } from './UsersModel';

export class ProjectsModel extends AbstractModel<ProjectsModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare ownerUserId: number;
  declare createdAt?: Date;
  declare updatedAt?: Date;

  static setup = (sequelize: Sequelize) => {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        title: { type: DataTypes.STRING, allowNull: false },

        description: { type: DataTypes.STRING, allowNull: false },

        ownerUserId: {
          type: DataTypes.INTEGER,
          field: 'owner_user_id',
          allowNull: false,
          references: {
            key: 'id',
            model: UsersModel,
          },
          onDelete: 'CASCADE',
        },

        createdAt: {
          type: DataTypes.DATE,
          field: 'created_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },

        updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },

      {
        sequelize,
        tableName: 'projects',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
