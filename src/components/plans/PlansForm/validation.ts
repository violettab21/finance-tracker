import * as z from 'zod';

export const ValidationSchemaPlan = z.object({
  category: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { message: 'Category is required' }
  ),
  cost: z
    .number({ message: 'Cost is required' })
    .positive({ message: 'Cost should be positive' }),
  month: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { message: 'Month is required' }
  ),
  year: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { message: 'Year is required' }
  ),
});

export type FormDataPlan = z.infer<typeof ValidationSchemaPlan>;
