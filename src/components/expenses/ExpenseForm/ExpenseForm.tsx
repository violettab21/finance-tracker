import Input from '../../Input/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledFlexWrapper } from '../../../styled/flex';
import { ValidationSchemaExpense, type FormDataExpense } from './validation';

import CustomSelect, { type Option } from '../../Select/CustomSelect';
import { StyledErrorText } from '../../Input/styles';
import type { ExpenseData } from '../../../services/expenses/expenses';
import { transformDateForInput } from '../../../helpers/helpers';
import { StyledModalTitle } from '../../../styled/titles';

interface ExpenseFormProps {
  title: string;
  onSubmit: (data: FormDataExpense) => Promise<void>;
  categories: Option[];
  editedExpense: ExpenseData | null;
}

export default function ExpenseForm({
  title,
  onSubmit,
  categories,
  editedExpense,
}: ExpenseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataExpense>({
    resolver: zodResolver(ValidationSchemaExpense),
    mode: 'onChange',
    defaultValues: editedExpense
      ? {
          category:
            categories.find((el) => el.value === editedExpense?.category) ||
            categories[0],
          cost: editedExpense?.cost || 1,
          date: editedExpense?.date
            ? transformDateForInput(editedExpense?.date)
            : transformDateForInput(new Date().toLocaleString()),
        }
      : undefined,
  });

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledModalTitle>{title}</StyledModalTitle>
          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  defaultValue={
                    editedExpense &&
                    categories.find((el) => el.value === editedExpense.category)
                  }
                  options={categories}
                />
              )}
            />
            {errors.category && (
              <StyledErrorText>{errors.category.message}</StyledErrorText>
            )}
          </StyledFlexWrapper>

          <Input
            type="number"
            defaultValue={editedExpense ? editedExpense.cost : undefined}
            placeholder="Cost"
            {...register('cost', { valueAsNumber: true })}
            error={errors.cost ? errors.cost?.message || null : null}
          ></Input>

          <Input
            placeholder="Date"
            type="date"
            defaultValue={
              editedExpense
                ? transformDateForInput(editedExpense.date)
                : transformDateForInput(new Date().toLocaleString())
            }
            {...register('date')}
            error={errors.date ? errors.date?.message || null : null}
          ></Input>

          <Input
            placeholder="Notes"
            type="text"
            defaultValue={editedExpense ? editedExpense.notes : ''}
            {...register('notes')}
            error={errors.notes ? errors.notes?.message || null : null}
          ></Input>
          <Button primary>{title}</Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
