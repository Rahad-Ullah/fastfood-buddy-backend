import { z } from 'zod';
import { FoodCategory } from './food.constants';

export const TypicalServingSchema = z
  .object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    fiber: z.number().nonnegative(),
  })
  .strict();

export const createFoodSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty('Name cannot be empty'),
      category: z.nativeEnum(FoodCategory),
      restaurant: z
        .string()
        .length(24, 'Invalid restaurant ID')
        .nonempty('Restaurant ID cannot be empty'),
      fact: z.string().nonempty('Fact cannot be empty'),
      reason: z.string().nonempty('Reason cannot be empty'),
      absorption: z.string().nonempty('Absorption cannot be empty'),
      description: z.string().nonempty('Description cannot be empty'),
      typicalServing: TypicalServingSchema,
    })
    .strict(),
});

export const FoodValidations = {
  createFoodSchema,
};
