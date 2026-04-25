import { z } from 'zod';
import { IntakeOutcome, IntakeStatus } from './intake.constants';

const objectId = (field: string) =>
  z
    .string({ required_error: `${field} ID is required` })
    .regex(/^[0-9a-fA-F]{24}$/, `Invalid ${field} ID format`);

// create intake
export const createIntake = z.object({
  body: z
    .object({
      food: objectId('Food'),
    })
    .strict(),
});

// update intake
export const updateIntake = z.object({
  body: z
    .object({
      outcome: z.nativeEnum(IntakeOutcome).nullable().optional(),
      reaction: z.string().trim().nullable().optional(),
      peakValue: z.number().nonnegative().nullable().optional(),
      remark: z.string().trim().nullable().optional(),
      status: z.nativeEnum(IntakeStatus).optional(),
    })
    .strict(),
});

export const IntakeValidations = {
  createIntake,
  updateIntake,
};
