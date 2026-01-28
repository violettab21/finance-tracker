import Input from '../../Input/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledFlexWrapper } from '../../../styled/flex';
import { ValidationSchemaExpense, type FormDataExpense } from './validation';
import { customStyles, StyledSelect, StyledTitle } from './styles';

import {
  editExpense,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { categories } from '../../Select/CustomSelect';
import type { Dispatch, SetStateAction } from 'react';
import { StyledErrorText } from '../../Input/styles';

export default function ExpenseFormEdit({
  setExpenses,
  expense,
  onClose,
}: {
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
  expense: ExpenseData | null;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataExpense>({
    resolver: zodResolver(ValidationSchemaExpense),
    defaultValues: {
      category:
        categories.find((el) => el.value === expense?.category) ||
        categories[0],
      cost: expense?.cost || 1,
      date: expense?.date
        ? transformDateForInput(expense?.date)
        : new Date().toLocaleString(),
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormDataExpense) => {
    console.log(data);
    try {
      const userExpanses = await editExpense({
        id: expense?.id || '',
        category: data.category.value,
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });

      setExpenses(userExpanses);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  function transformDateForInput(initialDate: string) {
    const dateObject = new Date(initialDate);

    const date = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    return `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
  }

  if (!expense) return null;

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Edit Expense</StyledTitle>
          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  defaultValue={categories.find(
                    (el) => el.value === expense.category
                  )}
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
            defaultValue={expense.cost}
            placeholder="Cost"
            {...register('cost', { valueAsNumber: true })}
            error={errors.cost ? errors.cost?.message || null : null}
          ></Input>

          <Input
            placeholder="Date"
            type="date"
            defaultValue={transformDateForInput(expense.date)}
            {...register('date')}
            error={errors.date ? errors.date?.message || null : null}
          ></Input>

          <Input
            placeholder="Notes"
            type="text"
            defaultValue={expense.notes}
            {...register('notes')}
            error={errors.notes ? errors.notes?.message || null : null}
          ></Input>

          <Button primary>Edit</Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
