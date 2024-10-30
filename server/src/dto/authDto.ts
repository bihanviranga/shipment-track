import { z } from 'zod';

export const registerInputSchema = z
  .object({
    name: z.string().min(1),
    address: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export type RegisterInputDto = z.infer<typeof registerInputSchema>;

export const loginInputSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1),
  })
  .strict();

export type LoginInputDto = z.infer<typeof loginInputSchema>;
