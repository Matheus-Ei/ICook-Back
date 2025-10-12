import { z } from 'zod';

export class RoleSchema {
  static titleParam = () => {
    return z.object({
      title: z.string({ message: 'Title must be a string' }),
    });
  };
}
