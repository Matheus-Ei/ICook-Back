import { inject } from 'inversify';
import { Recipe } from '../entities/Recipe';
import { RecipesModel } from '../models/RecipesModel';
import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { QueryTypes, Sequelize, Transaction } from 'sequelize';
import { Database } from '../database';
import { TYPES } from '../providers/types';
import { CompleteRecipeType } from '../types/Recipes';

type EntityType = Recipe;
type ModelType = RecipesModel;

const Entity = Recipe;
const Model = RecipesModel;

@injectable()
export class RecipeRepository {
  private database: Sequelize;

  constructor(
    @inject(TYPES.Database) database: Database
  ) {
    this.database = database.getDatabase();
  }

  private createObject = (data: ModelType | null): EntityType | null => {
    return data
      ? new Entity(
          data.id,
          data.title,
          data.ingredients,
          data.instructions,
          data.ownerUserId,
          data.description
        )
      : null;
  };

  findById = async (id: number, currentUserId: number): AsyncMaybe<CompleteRecipeType> => {
    const response = await this.database.query<CompleteRecipeType>(
      `
        WITH recipe_comments_agg AS (
          SELECT
            rc.recipe_id,
            COUNT(rc.id) AS comments_count,
            JSONB_AGG(
              JSONB_BUILD_OBJECT(
                'comment', rc.comment,
                'author', u.name,
                'createdAt', rc.created_at
              )
            ) AS comments
          FROM recipe_comments rc
          JOIN users u ON rc.user_id = u.id
          WHERE rc.recipe_id = :recipeId
          GROUP BY rc.recipe_id
        ),

        recipe_rates_agg AS (
          SELECT
            rr.recipe_id,
            COUNT(rr.id) AS rates_count,
            COALESCE(AVG(rr.rate), 0) AS average_rate
          FROM recipe_rates rr
          WHERE rr.recipe_id = :recipeId
          GROUP BY rr.recipe_id
        ),

        recipe_images_agg AS (
          SELECT
            ri.recipe_id,
            ARRAY_AGG(ri.image_base64) AS images
          FROM recipe_images ri
          WHERE ri.recipe_id = :recipeId
          GROUP BY ri.recipe_id
        ),

        user_specific_data AS (
          SELECT
            usr.recipe_id,
            TRUE AS is_saved_by_user
          FROM user_saved_recipes usr
          WHERE usr.recipe_id = :recipeId AND usr.user_id = :currentUserId
        ),

        user_rate_data AS (
          SELECT
            rr.recipe_id,
            rr.rate AS user_rate
          FROM recipe_rates rr
          WHERE rr.recipe_id = :recipeId AND rr.user_id = :currentUserId
        )

        SELECT
          r.id,
          r.title,
          r.description,
          r.ingredients,
          r.instructions,
          r.owner_user_id AS "ownerUserId",
          owner.name AS "ownerUserName",
          ria.images,
          rca.comments,
          rca.comments_count,
          rra.rates_count,
          rra.average_rate,
          COALESCE(usd.is_saved_by_user, FALSE) AS is_saved_by_user,
          urd.user_rate
        FROM recipes r
        JOIN users owner ON r.owner_user_id = owner.id
        LEFT JOIN recipe_images_agg ria ON r.id = ria.recipe_id
        LEFT JOIN recipe_comments_agg rca ON r.id = rca.recipe_id
        LEFT JOIN recipe_rates_agg rra ON r.id = rra.recipe_id
        LEFT JOIN user_specific_data usd ON r.id = usd.recipe_id
        LEFT JOIN user_rate_data urd ON r.id = urd.recipe_id
        WHERE r.id = :recipeId;
      `,
      {
        replacements: { recipeId: id, currentUserId },
        type: QueryTypes.SELECT,
      }
    )

    return response[0] || null;
  };

  getAll = async (): AsyncMaybe<EntityType[]> => {
    return await Model.findAll();
  };

  create = async (
    data: Omit<EntityType, 'id'>,
    transaction?: Transaction
  ): AsyncMaybe<EntityType> => {
    return this.createObject(await Model.create(data, { transaction }));
  };

  deleteById = async (id: number): Promise<boolean> => {
    const deletedId = await Model.destroy({ where: { id } });
    return deletedId ? true : false;
  };

  updateById = async (
    id: number,
    data: Editable<EntityType>
  ): Promise<boolean> => {
    const [affectedCount] = await Model.update(data, {
      where: { id },
      returning: true,
    });

    if (affectedCount > 0) return true;
    return false;
  };
}
