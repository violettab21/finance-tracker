import * as z from 'zod';

export const ValidationSchemaSignIn = z.object({
  email: z
    .email({ message: 'Invalid email format' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one capital letter')
    .regex(/[\W_]/, 'Password must contain at least one special character'),
});
