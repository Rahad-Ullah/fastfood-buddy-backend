import { z } from 'zod';

export const historySchema = z.object({
  body: z
    .object({
      food: z
        .string()
        .length(24, 'Invalid food ID')
        .nonempty('Food ID cannot be empty'),
    })
    .strict(),
});

export const HistoryValidations = {
  historySchema,
};
