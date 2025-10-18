import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class RecipeRatesModel extends AbstractModel<RecipeRatesModel> {
  declare id: CreationOptional<number>;
  declare recipeId: number;
  declare userId: number;
  declare rate: number;
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
          references: { model: 'recipes', key: 'id' },
          allowNull: false,
        },

        userId: {
          type: DataTypes.INTEGER,
          field: 'user_id',
          references: { model: 'users', key: 'id' },
          allowNull: false,
        },

        rate: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: { min: 1, max: 5 },
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
        tableName: 'recipe_rates',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
