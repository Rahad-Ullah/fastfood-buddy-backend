import { z } from 'zod';

const createRestaurantSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty("Name can't be empty!"),
      logo: z.string().optional(),
    })
    .strict(),
});

const updateRestaurantSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty("Name can't be empty!").optional(),
      logo: z.string().optional(),
    })
    .strict(),
});

export const RestaurantValidations = {
  createRestaurantSchema,
  updateRestaurantSchema,
};
