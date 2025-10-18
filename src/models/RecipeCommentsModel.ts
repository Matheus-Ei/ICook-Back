import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class RecipeCommentsModel extends AbstractModel<RecipeCommentsModel> {
  declare id: CreationOptional<number>;
  declare recipeId: number;
  declare userId: number;
  declare comment: string;
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

        recipeId: {
          type: DataTypes.INTEGER,
          field: 'recipe_id',
          references: {
            model: 'recipes',
            key: 'id',
          },
          allowNull: false,
        },

        userId: {
          type: DataTypes.INTEGER,
          field: 'user_id',
          references: {
            model: 'users',
            key: 'id',
          },
          allowNull: false,
        },

        comment: {
          type: DataTypes.TEXT,
          allowNull: false,
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
        tableName: 'recipe_comments',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
