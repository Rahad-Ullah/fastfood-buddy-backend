import { z } from 'zod';
import { DisclaimerType } from './disclaimer.constants';

// Disclaimer creation schema
export const createDisclaimer = z.object({
  body: z
    .object({
      type: z.nativeEnum(DisclaimerType),
      content: z.string().nonempty('Content is required'),
    })
    .strict(),
});

// get single disclaimer by type
export const getSingleDisclaimerByType = z.object({
  params: z
    .object({
      type: z.nativeEnum(DisclaimerType),
    })
    .strict(),
});

export const DisclaimerValidations = {
  createDisclaimer,
  getSingleDisclaimerByType,
};
