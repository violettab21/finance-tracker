import * as z from 'zod';

export const ValidationSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    newPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: z
      .string()
      .min(8, 'Password must contain at least 8 characters')
      .regex(/[a-z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one capital letter')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
