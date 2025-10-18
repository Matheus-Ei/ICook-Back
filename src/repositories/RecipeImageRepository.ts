import { RecipeImage } from '../entities/RecipeImage';
import { RecipeImagesModel } from '../models/RecipeImagesModel';
import { AsyncMaybe, Editable } from '../types';
import { injectable } from 'inversify';
import { Transaction } from 'sequelize';

type EntityType = RecipeImage;
type ModelType = RecipeImagesModel;

const Entity = RecipeImage;
const Model = RecipeImagesModel;

@injectable()
export class RecipeImageRepository {
  private createObject = (data: ModelType | null): EntityType | null => {
    return data
      ? new Entity(
          data.id,
          data.recipeId,
          data.imageBase64
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
