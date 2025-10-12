import { z } from 'zod';

export class SubscriptionSchema {
  static getQuery = () => {
    return z.object({
      title: z.string({ message: 'Title must be a string' }).optional(),
    });
  };

  static changePlan = () => {
    return z.object({
      planTitle: z.string({ message: 'Plan title must be a string' }),
    });
  };
}
