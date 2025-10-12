import { z } from 'zod';

export class PageSchema {
  static defaultParams = () => {
    return z.object({
      pageId: z.string({ message: 'ID must be a string' }),
      projectId: z.string({ message: 'Project ID must be a string' }),
    });
  };

  static periodQuery = () => {
    return z.object({
      startDate: z.string({
        message: 'You must pass a date for the start date',
      }),
      endDate: z.string({ message: 'You must pass a date for the end date' }),
    });
  };

  static create = () => {
    return z.object({
      title: z
        .string({ message: 'Title must be a string' })
        .min(5, { message: 'Title must be at least 5 characters long' }),
      description: z
        .string({ message: 'Description must be a string' })
        .optional(),
      emoji: z.string({ message: 'Emoji must be a string' }).optional(),
      nextSiblingId: z
        .number({ message: 'Next sibling ID must be a number' })
        .optional(),
      parentId: z.number({ message: 'Parent ID must be a number' }).optional(),
      moduleId: z.number({ message: 'Module ID must be a number' }).optional(),
    });
  };

  static setModule = () => {
    return z.object({
      moduleTitle: z.string({ message: 'Module title must be a string' }),
    });
  };

  static edit = () => {
    return z
      .object({
        title: z
          .string({ message: 'Title must be a string' })
          .min(5, { message: 'Title must be at least 5 characters long' })
          .optional(),
        description: z
          .string({ message: 'Description must be a string' })
          .optional(),
        emoji: z.string({ message: 'Emoji must be a string' }).optional(),
        nextSiblingId: z
          .number({ message: 'Next sibling ID must be a number' })
          .optional(),
        parentId: z
          .number({ message: 'Parent ID must be a number' })
          .optional(),
        moduleId: z
          .number({ message: 'Module ID must be a number' })
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
