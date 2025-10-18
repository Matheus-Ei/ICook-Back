import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class RecipesModel extends AbstractModel<RecipesModel> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description?: string;
  declare ingredients: string;
  declare instructions: string;
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

        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },

        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },

        ingredients: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        instructions: {
          type: DataTypes.TEXT,
          allowNull: false,
        },

        ownerUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: 'owner_user_id',
          references: {
            model: 'users',
            key: 'id',
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
        tableName: 'recipes',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
