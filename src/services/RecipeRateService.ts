import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { RecipeRate } from '../entities/RecipeRate';
import { RecipeRateRepository } from '../repositories/RecipeRateRepository';

type EntityType = RecipeRate;

@injectable()
export class RecipeRateService {
  constructor(
    @inject(TYPES.RecipeRateRepository) private repository: RecipeRateRepository,
  ) {}

  add = async (data: Omit<EntityType, 'id'>): Promise<EntityType> => {
    const alreadyRated = await this.repository.findOne({
      where: {
        recipeId: data.recipeId,
        userId: data.userId,
      },
    });

    if (alreadyRated) {
      throw new Error('The user has already rated this recipe');
    }

    const created = await this.repository.create(data);

    if (!created) {
      throw new Error('The recipe rate was not created');
    }

    return created;
  };
}
