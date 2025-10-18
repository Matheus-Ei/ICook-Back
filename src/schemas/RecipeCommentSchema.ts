import { z } from 'zod';

export class RecipeCommentSchema {
  static default = () => {
    return z.object({
      recipeId: z.number().int().positive(),
      comment: z.string().min(1).max(1000),
    });
  };
}
