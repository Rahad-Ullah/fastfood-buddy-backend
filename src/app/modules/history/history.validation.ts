import { z } from 'zod';

export const historySchema = z.object({
  food: z
    .string()
    .length(24, 'Invalid food ID')
    .nonempty('Food ID cannot be empty'),
});

export const HistoryValidations = {
  historySchema,
};
