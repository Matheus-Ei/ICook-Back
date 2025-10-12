import { z } from 'zod';

export class ProjectSchema {
  static defaultParams = () => {
    return z.object({
      projectId: z.string({ message: 'Project ID must be a string' }),
    });
  };

  static create = () => {
    return z.object({
      title: z
        .string({ message: 'Title must be a string' })
        .min(5, { message: 'The title must contain at least 5 characters' }),
      description: z
        .string({ message: 'Description must be a string' })
        .min(10, {
          message: 'The description must contain at least 10 characters',
        }),
    });
  };

  static edit = () => {
    return z
      .object({
        title: z.string({ message: 'Title must be a string' }).optional(),
        description: z
          .string({ message: 'Description must be a string' })
          .optional(),
        ownerUserId: z
          .number({ message: 'Owner user ID must be a number' })
          .optional(),
      })
      .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
          message: 'At least one field must be provided for editing',
        }
      );
  };
}
