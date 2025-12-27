import { z } from 'zod';

export const noteSchema = z.object({
  body: z
    .object({
      observations: z.array(z.string().nonempty('Observation cannot be empty')),
    })
    .strict(),
});

export const NoteValidations = {
  noteSchema,
};
