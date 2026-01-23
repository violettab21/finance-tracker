import Input from '../../Input/Input';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledFlexWrapper } from '../../../styled/flex';
import { ValidationSchemaExpense, type FormDataExpense } from './validation';
import { customStyles, StyledSelect, StyledTitle } from './styles';
import { categories } from '../../Select/Select';
import {
  addExpense,
  getExpensesByUser,
} from '../../../services/expenses/expenses';

export default function ExpenseForm() {
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
    const result = await getExpensesByUser();
    console.log(result);
  };

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledTitle>Add Expense</StyledTitle>
          <Controller
            control={control}
            name="category"
            render={({ field: { onBlur, value } }) => (
              <StyledSelect
                options={categories}
                onBlur={onBlur}
                value={value}
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

          <Button primary disabled={!isValid}>
            Add
          </Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
