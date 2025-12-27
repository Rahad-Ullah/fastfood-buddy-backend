import { z } from 'zod';
import { SupportStatus } from './support.constants';

export const createSupportSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title cannot be empty'),
    message: z.string().nonempty('Message cannot be empty'),
  }),
});

export const updateSupportSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title cannot be empty').optional(),
    message: z.string().nonempty('Message cannot be empty').optional(),
    status: z.nativeEnum(SupportStatus).optional(),
  }),
});

export const SupportValidations = {
  createSupportSchema,
  updateSupportSchema,
};
