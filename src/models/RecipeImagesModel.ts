import { DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { AbstractModel } from './AbstractModel';

export class RecipeImagesModel extends AbstractModel<RecipeImagesModel> {
  declare id: CreationOptional<number>;
  declare recipeId: number;
  declare imageBase64: string;
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

        imageBase64: {
          type: DataTypes.TEXT,
          field: 'image_base64',
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
        tableName: 'recipe_images',
        timestamps: true,
        underscored: true,
      }
    );
  };
}
