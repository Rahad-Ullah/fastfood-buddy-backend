import { z } from 'zod';

export const favouriteSchema = z.object({
  user: z.string().length(24).nonempty(),
  food: z.string().length(24).nonempty(),
  note: z.string().nonempty().optional(),
});

export const FavouriteValidations = {
  favouriteSchema,
};
