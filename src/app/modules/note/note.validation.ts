import { z } from 'zod';

export const noteSchema = z.object({
  observations: z
    .array(z.string().nonempty('Observation cannot be empty'))
    .nonempty('Observations cannot be empty'),
});

export const NoteValidations = {
  noteSchema,
};
