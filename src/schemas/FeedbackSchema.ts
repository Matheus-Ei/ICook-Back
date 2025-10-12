import { z } from 'zod';

export class FeedbackSchema {
  static create = () => {
    return z.object({
      description: z.string().min(10, {
        message: 'The feedback must be at least 5 characters long',
      }),
      rating: z
        .number()
        .max(5, { message: 'The rating only goes to 5 start' })
        .min(1, { message: 'The minimum rating is 1 star' }),
    });
  };
}
