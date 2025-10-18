import { Recipe } from '../entities/Recipe';
import { RecipesModel } from '../models/RecipesModel';
import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

type EntityType = Recipe;
type ModelType = RecipesModel;

const Entity = Recipe;
const Model = RecipesModel;

@injectable()
export class RecipeRepository {
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

  findById = async (id: number): AsyncMaybe<EntityType> => {
    return this.createObject(await Model.findByPk(id));
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
