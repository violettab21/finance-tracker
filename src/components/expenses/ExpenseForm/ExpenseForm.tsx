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
import type { Dispatch, SetStateAction } from 'react';
import { StyledErrorText } from '../../Input/styles';

export default function ExpenseForm({
  setExpenses,
  getExpanses,
}: {
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
  getExpanses: () => Promise<ExpenseData[]>;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataExpense>({
    resolver: zodResolver(ValidationSchemaExpense),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormDataExpense) => {
    console.log(data);
    try {
      await addExpense({
        category: data.category.value,
        cost: data.cost,
        date: data.date,
      });
      const userExpanses = await getExpanses();

      setExpenses(userExpanses);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Add Expense</StyledTitle>
          <StyledFlexWrapper width="100%">
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
            {errors.category && (
              <StyledErrorText>{errors.category.message}</StyledErrorText>
            )}
          </StyledFlexWrapper>

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

          <Button primary>Add</Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
