import { z } from 'zod';

export class UserSchema {
  static create = () => {
    return z.object({
      name: z
        .string({ message: 'Name must be a string' })
        .min(5, { message: 'Name must be at least 5 characters long' })
        .max(250, { message: 'Name must be at most 250 characters long' }),
      email: z
        .string({ message: 'Email must be a string' })
        .email({ message: 'Invalid email format' }),
      password: z
        .string({ message: 'Password must be a string' })
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[a-z]/, {
          message: 'Password must contain at least one lowercase letter',
        })
        .regex(/[A-Z]/, {
          message: 'Password must contain at least one uppercase letter',
        })
        .regex(/[0-9]/, {
          message: 'Password must contain at least one number',
        })
        .regex(/[^a-zA-Z0-9]/, {
          message:
            'Password must contain at least one special character (e.g., !@#$%)',
        }),
    });
  };

  static login = () => {
    return z.object({
      email: z
        .string({ message: 'Email must be a string' })
        .email({ message: 'Invalid email format' }),
      password: z.string({ message: 'Password must be a string' }),
    });
  };

  static update = () => {
    return z
      .object({
        name: z
          .string({ message: 'Name must be a string' })
          .min(5, { message: 'Name must be at least 5 characters long' })
          .max(250, { message: 'Name must be at most 250 characters long' })
          .optional(),
        email: z
          .string({ message: 'Email must be a string' })
          .email({ message: 'Invalid email format' })
          .optional(),
        password: z
          .string({ message: 'Password must be a string' })
          .min(10, { message: 'Password must be at least 10 characters long' })
          .optional(),
      })
      .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
          message: 'At least one field must be provided for update',
        }
      );
  };
}
