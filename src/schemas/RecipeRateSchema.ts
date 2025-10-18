import { z } from 'zod';

export class RecipeRateSchema {
  static default = () => {
    return z.object({
      recipeId: z.number().int().positive(),
      rate: z.number().int().min(1).max(5),
    });
  };
}
