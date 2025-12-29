import { z } from 'zod';
import { DigestionSpeed, FoodCategory, ImpactSpeed } from './food.constants';

export const TypicalServingSchema = z
  .object({
    carbs: z.number().nonnegative(),
    protein: z.number().nonnegative(),
    fat: z.number().nonnegative(),
    fiber: z.number().nonnegative(),
  })
  .strict();

const createFoodSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty('Name cannot be empty'),
      category: z.nativeEnum(FoodCategory),
      restaurant: z
        .string()
        .length(24, 'Invalid restaurant ID')
        .nonempty('Restaurant ID cannot be empty'),
      impactSpeed: z.nativeEnum(ImpactSpeed),
      digestionSpeed: z.nativeEnum(DigestionSpeed),
      spike: z.string().nonempty('Spike cannot be empty'),
      fact: z.string().nonempty('Fact cannot be empty'),
      reason: z.string().nonempty('Reason cannot be empty'),
      absorption: z.string().nonempty('Absorption cannot be empty'),
      description: z.string().nonempty('Description cannot be empty'),
      typicalServing: TypicalServingSchema,
    })
    .strict(),
});

// update food schema
const updateFoodSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty('Name cannot be empty').optional(),
      category: z.nativeEnum(FoodCategory).optional(),
      impactSpeed: z.nativeEnum(ImpactSpeed).optional(),
      digestionSpeed: z.nativeEnum(DigestionSpeed).optional(),
      spike: z.string().nonempty('Spike cannot be empty').optional(),
      fact: z.string().nonempty('Fact cannot be empty').optional(),
      reason: z.string().nonempty('Reason cannot be empty').optional(),
      absorption: z.string().nonempty('Absorption cannot be empty').optional(),
      description: z.string().nonempty('Description cannot be empty').optional(),
      typicalServing: TypicalServingSchema.optional(),
    })
    .strict(),
});

export const FoodValidations = {
  createFoodSchema,
  updateFoodSchema,
};
