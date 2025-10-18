import { inject, injectable } from 'inversify';
import { TYPES } from '../providers/types';
import { UserSavedRecipe } from '../entities/UserSavedRecipe';
import { UserSavedRecipeRepository } from '../repositories/UserSavedRecipeRepository';

type EntityType = UserSavedRecipe;

@injectable()
export class UserSavedRecipeService {
  constructor(
    @inject(TYPES.UserSavedRecipeRepository) private repository: UserSavedRecipeRepository,
  ) {}

  save = async (recipeId: number, userId: number): Promise<EntityType> => {
    const alreadySaved = await this.repository.findByRecipeAndUser(recipeId, userId);
    if (alreadySaved) {
      throw new Error('Recipe is already saved by the user.');
    }

    const created = await this.repository.save(recipeId, userId);

    if (!created) {
      throw new Error('Failed to save the recipe.');
    }

    return created;
  };

  getAllSavedByUser = async (userId: number): Promise<EntityType[]> => {
    return this.repository.getSavedByUser(userId);
  }

  unsave = async (recipeId: number, userId: number): Promise<boolean> => {
    return this.repository.unsave(recipeId, userId);
  };
}
