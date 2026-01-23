import * as z from 'zod';

export const ValidationSchemaExpense = z.object({
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
  date: z.string(),
});

export type FormDataExpense = z.infer<typeof ValidationSchemaExpense>;
