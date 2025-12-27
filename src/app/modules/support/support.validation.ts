import { z } from 'zod';
import { SupportStatus } from './support.constants';

export const createSupportSchema = z.object({
  body: z.object({
    title: z.string(),
    message: z.string(),
  }),
});

export const updateSupportSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    status: z.nativeEnum(SupportStatus).optional(),
  }),
});

export const SupportValidations = {
  createSupportSchema,
  updateSupportSchema,
};
