import { z } from 'zod';

export class SharedProjectSchema {
  static create = () => {
    return z.object({
      userEmail: z
        .string({ message: 'User email must be a string' })
        .email({ message: 'Invalid email format' }),
      roleTitle: z.string({ message: 'Role title must be a string' }),
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

  static edit = () => {
    return z.object({
      roleTitle: z.string({ message: 'Role title must be a string' }),
    });
  };

  static queryEmail = (isOptional: boolean = false) => {
    if (isOptional) {
      return z.object({
        userEmail: z
          .string({ message: 'User email must be a string' })
          .email({ message: 'Invalid email format' })
          .optional(),
      });
    }

    return z.object({
      userEmail: z
        .string({ message: 'User email must be a string' })
        .email({ message: 'Invalid email format' }),
    });
  };
}
