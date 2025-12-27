import { z } from 'zod';

export const ratingSchema = z.object({
  body: z
    .object({
      rating: z.number().nonnegative(),
    })
    .strict(),
});

export const RatingValidations = {
  ratingSchema,
};
