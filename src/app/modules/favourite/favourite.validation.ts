import { z } from 'zod';

export const favouriteSchema = z.object({
  body: z
    .object({
      food: z
        .string()
        .length(24, 'Invalid food ID')
        .nonempty('Food ID cannot be empty'),
      note: z.string().nonempty('Note cannot be empty').optional(),
      isFavourite: z.boolean().optional(),
    })
    .strict(),
});

export const FavouriteValidations = {
  favouriteSchema,
};
