import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { RolesModel } from './RolesModel';
import { UsersModel } from './UsersModel';
import { ProjectsModel } from './ProjectsModel';

export class SharedProjectsModel extends AbstractModel<SharedProjectsModel> {
  declare id: CreationOptional<number>;
  declare roleId: number;
  declare userId: number;
  declare projectId: number;
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

        roleId: {
          type: DataTypes.INTEGER,
          references: { model: RolesModel, key: 'id' },
          field: 'role_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        userId: {
          type: DataTypes.INTEGER,
          references: { model: UsersModel, key: 'id' },
          field: 'user_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        projectId: {
          type: DataTypes.INTEGER,
          references: { model: ProjectsModel, key: 'id' },
          field: 'project_id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
        tableName: 'shared_projects',
        timestamps: true,
        underscored: true,
        indexes: [
          {
            unique: true,
            fields: ['project_id', 'user_id'],
          },
        ],
      }
    );
  };
}
