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
export class UserSavedRecipeRepository {
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

  findByRecipeAndUser = async (recipeId: number, userId: number): AsyncMaybe<EntityType> => {
    const record = await Model.findOne({ where: { recipeId, userId } });
    return this.createObject(record);
  };

  getSavedByUser = async (userId: number): Promise<EntityType[]> => {
    const records = await Model.findAll({ where: { userId } });
    return records.map((record) => this.createObject(record)!) ;
  };

  unsave = async (recipeId: number, userId: number): Promise<boolean> => {
    const deletedCount = await Model.destroy({ where: { recipeId, userId } });
    return deletedCount > 0;
  };

  save = async (recipeId: number, userId: number): AsyncMaybe<EntityType> => {
    const record = await Model.create({ recipeId, userId });
    return this.createObject(record);
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
