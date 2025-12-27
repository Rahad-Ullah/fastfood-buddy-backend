import { z } from 'zod';

export const ratingSchema = z.object({
  body: z
    .object({
      stars: z.number().nonnegative(),
    })
    .strict(),
});

export const RatingValidations = {
  ratingSchema,
};
