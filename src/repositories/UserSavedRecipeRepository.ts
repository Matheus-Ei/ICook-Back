import { UserSavedRecipe } from '../entities/UserSavedRecipe';
import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { Transaction } from 'sequelize';
import { UserSavedRecipesModel } from '../models/UserSavedRecipesModel';

type EntityType = UserSavedRecipe;
type ModelType = UserSavedRecipesModel;

const Entity = UserSavedRecipe;
const Model = UserSavedRecipesModel;

@injectable()
export class RecipeRepository {
  private createObject = (data: ModelType | null): EntityType | null => {
    return data
      ? new Entity(
          data.id,
          data.userId,
          data.recipeId
        )
      : null;
  };

  findById = async (id: number): AsyncMaybe<EntityType> => {
    return this.createObject(await Model.findByPk(id));
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
