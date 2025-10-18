import { RecipeRepository } from '../repositories/RecipeRepository';
import { AsyncMaybe, Editable } from '../types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { Recipe } from '../entities/Recipe';
import { Database } from '../database';
import { TreatError } from '../utils/TreatError';

type EntityType = Recipe;

@injectable()
export class RecipeService {
  constructor(
    @inject(TYPES.RecipeRepository) private repository: RecipeRepository,
    @inject(TYPES.Database) private database: Database
  ) {}

  get = async (id: number): AsyncMaybe<EntityType> => {
    return this.repository.findById(id);
  };

  getAll = async (): AsyncMaybe<EntityType[]> => {
    return this.repository.getAll();
  };

  create = async (data: Omit<EntityType, 'id'>): Promise<EntityType> => {
    const transaction = await this.database.connection.transaction();

    try {
      const created = await this.repository.create(data, transaction);

      if (!created) {
        await transaction.rollback();
        throw new Error('The recipe was not created');
      }

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
