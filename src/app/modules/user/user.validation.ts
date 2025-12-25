import { z } from 'zod';
import { USER_STATUS } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const updateUserZodSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  status: z.nativeEnum(USER_STATUS).optional(),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
