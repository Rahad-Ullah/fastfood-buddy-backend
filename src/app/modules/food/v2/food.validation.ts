import { z } from 'zod';
import {
  FoodCategory,
} from '../shared/food.constants';

const createFoodSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty('Name cannot be empty'),
      category: z.nativeEnum(FoodCategory),
      restaurant: z
        .string()
        .length(24, 'Invalid restaurant ID')
        .nonempty('Restaurant ID cannot be empty'),
    })
    .strict(),
});

// update food schema
const updateFoodSchema = z.object({
  body: z
    .object({
      name: z.string().nonempty('Name cannot be empty').optional(),
      category: z.nativeEnum(FoodCategory).optional(),
    })
    .strict(),
});

export const foodSchema = z.object({
  name: z.string().nonempty('Name cannot be empty'),
  category: z.nativeEnum(FoodCategory),
});

export const bulkFoodSchema = z.array(foodSchema);

const importFoodsSchema = z.object({
  body: z
    .object({
      restaurant: z.string().length(24, 'Invalid restaurant ID'),
      doc: z.any(),
    })
    .strict(),
});

export const FoodValidations = {
  createFoodSchema,
  updateFoodSchema,
  importFoodsSchema,
  foodSchema,
  bulkFoodSchema,
};
