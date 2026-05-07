import { z } from 'zod';
import { IntakeOutcome } from '../intake/intake.constants';

// create zod validation schemas
const createBuddyInsightSchema = z.object({
  body: z
    .object({
      outcome: z.nativeEnum(IntakeOutcome),
      message: z.string().nonempty('Message cannot be empty'),
    })
    .strict(),
});

// update zod validation schemas
const updateBuddyInsightSchema = z.object({
  params: z
    .object({
      id: z.string().length(24, 'Invalid ID'),
    })
    .strict(),
  body: z
    .object({
      outcome: z.nativeEnum(IntakeOutcome).optional(),
      message: z.string().nonempty('Message cannot be empty').optional(),
      isActive: z.boolean().optional(),
    })
    .strict(),
});

// delete zod validation schemas
const deleteBuddyInsightSchema = z.object({
  params: z
    .object({
      id: z.string().length(24, 'Invalid ID'),
    })
    .strict(),
});

// get all insights validation schemas
export const getAllBuddyInsightsSchema = z.object({
  query: z
    .object({
      outcome: z.nativeEnum(IntakeOutcome).optional(),
      searchTerm: z.string().optional(),
      isActive: z.string().optional(),
    })
    .strict(),
});

export const BuddyInsightValidations = {
  createBuddyInsightSchema,
  updateBuddyInsightSchema,
  deleteBuddyInsightSchema,
  getAllBuddyInsightsSchema,
};
