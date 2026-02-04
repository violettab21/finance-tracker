import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ValidationSchemaPlan, type FormDataPlan } from './validation';
import { StyledFlexWrapper } from '../../../styled/flex';
import { customStyles, StyledSelect } from '../../expenses/ExpenseForm/styles';
import { categories } from '../../Select/CustomSelect';
import { StyledErrorText } from '../../Input/styles';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { addPlan } from '../../../services/plans/plans';
import { useContext, useState } from 'react';
import { ExpensesContext } from '../../../context/expensesContext';
const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

export default function PlansForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataPlan>({
    resolver: zodResolver(ValidationSchemaPlan),
    mode: 'onChange',
  });
  const { plans, setPlans } = useContext(ExpensesContext);
  const [isPlanError, setIsPlanError] = useState<string>();

  const years = generateYears();

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years.map((year) => {
      return {
        value: year.toString(),
        label: year.toString(),
      };
    });
  }

  const onSubmit = async (data: FormDataPlan) => {
    try {
      const existingPlan = plans.find(
        (plan) =>
          plan.category === data.category.value &&
          plan.month === data.month.value &&
          plan.year === +data.year.value
      );
      if (existingPlan) {
        setIsPlanError('Such plan already exists');
      } else {
        const updatedPlans = await addPlan({
          category: data.category.value,
          cost: data.cost,
          month: data.month.value,
          year: +data.year.value,
        });

        setPlans(updatedPlans);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <p>Add plan</p>
          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  options={categories}
                  styles={customStyles}
                  placeholder="Select category"
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
          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="month"
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  options={months}
                  styles={customStyles}
                  placeholder="Select Month"
                />
              )}
            />
            {errors.category && (
              <StyledErrorText>{errors.category.message}</StyledErrorText>
            )}
          </StyledFlexWrapper>

          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="year"
              render={({ field }) => (
                <StyledSelect
                  {...field}
                  options={years}
                  styles={customStyles}
                  placeholder="Select Year"
                />
              )}
            />
            {errors.category && (
              <StyledErrorText>{errors.category.message}</StyledErrorText>
            )}
          </StyledFlexWrapper>
          {isPlanError && <StyledErrorText>{isPlanError}</StyledErrorText>}
          <Button primary>Add</Button>
        </StyledFlexWrapper>
      </form>
    </StyledFlexWrapper>
  );
}
