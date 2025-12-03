import { RecipeRepository } from '../repositories/RecipeRepository';
import { AsyncMaybe, Editable } from '../types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Recipe } from '../entities/Recipe';
import { Database } from '../database';
import { TreatError } from '../utils/TreatError';
import { RecipeImageRepository } from '../repositories/RecipeImageRepository';
import { Base64Converter } from '../utils/Base64Converter';
import { CompleteRecipeType, CreateRecipeType } from '../types/Recipes';

type EntityType = Recipe;

@injectable()
export class RecipeService {
  constructor(
    @inject(TYPES.RecipeRepository) private repository: RecipeRepository,
    @inject(TYPES.RecipeImageRepository) private recipeImageRepository: RecipeImageRepository,
    @inject(TYPES.Database) private database: Database
  ) {}

  get = async (id: number, currentUserId: number): AsyncMaybe<CompleteRecipeType> => {
    return this.repository.findById(id, currentUserId);
  };

  getAll = async (): AsyncMaybe<EntityType[]> => {
    return this.repository.getAll();
  };

  create = async (data: Omit<CreateRecipeType, 'id'>): Promise<EntityType> => {
    const transaction = await this.database.connection.transaction();

    try {
      // Create the recipe first
      const created = await this.repository.create(data, transaction);

      if (!created) {
        await transaction.rollback();
        throw new Error('The recipe was not created');
      }

      // Add the images to the recipe
      const imageCreationPromises = data.images.map(imageBuffer => {
        const buffer = Buffer.from(imageBuffer.buffer);
        const imageBase64 = Base64Converter.encode(buffer);

        if (!imageBase64) {
          throw new Error(`Failed to encode an image.`);
        }

        return this.recipeImageRepository.create({
          recipeId: created.id,
          imageBase64: imageBase64,
        }, transaction);
      });

      await Promise.all(imageCreationPromises);

      await transaction.commit();

      return created;
    } catch (error) {
      transaction.rollback();
      throw new Error(TreatError.stringify(error));
    }
  };

  delete = async (id: number): Promise<boolean> => {
    return this.repository.deleteById(id);
  };

  update = async (id: number, data: Editable<EntityType>): Promise<boolean> => {
    return this.repository.updateById(id, data);
  };
}
