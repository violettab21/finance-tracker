import * as z from 'zod';

export const ValidationSchema = z.object({
  firstName: z.string().nonempty({ message: 'firstName is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
  email: z
    .email({ message: 'Invalid email format' })
    .nonempty({ message: 'Email is required' }),
});
