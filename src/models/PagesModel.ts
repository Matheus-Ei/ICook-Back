import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';
import { ProjectsModel } from './ProjectsModel';
import { ModulesModel } from './ModulesModel';

export class PagesModel extends AbstractModel<PagesModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string | null;
  declare emoji: string | null;
  declare parentId: number | null;
  declare nextSiblingId: number | null;
  declare projectId: number;
  declare moduleId: number | null;
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

        description: { type: DataTypes.STRING },

        emoji: { type: DataTypes.STRING, defaultValue: '✨' },

        parentId: {
          type: DataTypes.INTEGER,
          field: 'parent_id',
          references: { key: 'id', model: PagesModel },
          onDelete: 'CASCADE',
        },

        nextSiblingId: {
          type: DataTypes.INTEGER,
          field: 'next_sibling_id',
          references: { key: 'id', model: PagesModel },
          onDelete: 'SET NULL',
        },

        projectId: {
          type: DataTypes.INTEGER,
          field: 'project_id',
          references: { key: 'id', model: ProjectsModel },
          allowNull: false,
          onDelete: 'CASCADE',
        },

        moduleId: {
          type: DataTypes.INTEGER,
          field: 'module_id',
          references: { key: 'id', model: ModulesModel },
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
        tableName: 'pages',
        timestamps: true,
        underscored: true,
        indexes: [
          {
            unique: true,
            fields: ['project_id', 'parent_id', 'next_sibling_id'],
          },
        ],
      }
    );
  };
}
