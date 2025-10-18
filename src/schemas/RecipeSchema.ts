import { z } from 'zod';

export class RecipeSchema {
  static default = () => {
    return z.object({
      title: z
        .string({ message: 'Title must be a string' })
        .min(5, { message: 'Title must be at least 5 characters long' })
        .max(250, { message: 'Title must be at most 250 characters long' }),
      description: z
        .string({ message: 'Description must be a string' })
        .min(10, { message: 'Description must be at least 10 characters long' })
        .max(1000, {
          message: 'Description must be at most 1000 characters long',
        }),
      ingredients: z
        .string({ message: 'Description must be a string' })
        .min(10, { message: 'Description must be at least 10 characters long' })
        .max(1000, {
          message: 'Description must be at most 1000 characters long',
        }),
      instructions: z
        .string({ message: 'Description must be a string' })
        .min(10, {
          message: 'Description must be at least 10 characters long',
        }),
      ownerUserId: z.string().optional(),
    });
  };
}
