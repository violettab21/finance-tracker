import Input from '../../Input/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledFlexWrapper } from '../../../styled/flex';
import { ValidationSchemaExpense, type FormDataExpense } from './validation';
import { customStyles, StyledSelect, StyledTitle } from './styles';

import {
  addExpense,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { categories } from '../../Select/CustomSelect';

export default function ExpenseForm({
  getExpanses,
}: {
  getExpanses: () => Promise<ExpenseData[]>;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormDataExpense>({
    resolver: zodResolver(ValidationSchemaExpense),
    mode: 'onBlur',
  });

  const onSubmit = async (data: FormDataExpense) => {
    console.log(data);
    await addExpense({
      category: data.category.value,
      cost: data.cost,
      date: data.date,
    });
    await getExpanses();
  };

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Add Expense</StyledTitle>

          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <StyledSelect
                {...field}
                options={categories}
                styles={customStyles}
              />
            )}
          />

          <Input
            type="number"
            placeholder="Cost"
            {...register('cost', { valueAsNumber: true })}
            error={errors.cost ? errors.cost?.message || null : null}
          ></Input>

          <Input
            placeholder="Date"
            type="date"
            {...register('date')}
            error={errors.date ? errors.date?.message || null : null}
          ></Input>

          <Button primary disabled={isValid}>
            Add
          </Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
