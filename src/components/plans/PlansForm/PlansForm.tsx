import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { ValidationSchemaPlan, type FormDataPlan } from './validation';
import { StyledFlexWrapper } from '../../../styled/flex';
import { StyledErrorText } from '../../Input/styles';
import Input from '../../Input/Input';
import Button from '../../Button/Button';
import { CATEGORIES, MONTHS } from '../../../constants/constants';
import CustomSelect from '../../Select/CustomSelect';
import { StyledModalTitle } from '../../../styled/titles';

export default function PlansForm({
  onSubmit,
  isPlanError,
}: {
  onSubmit: (data: FormDataPlan) => Promise<void>;
  isPlanError: string | null;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataPlan>({
    resolver: zodResolver(ValidationSchemaPlan),
    mode: 'onChange',
  });

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

  return (
    <StyledFlexWrapper width="100%" justify="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlexWrapper direction="column" width="100%" gap="10px">
          <StyledModalTitle>Add plan</StyledModalTitle>
          <StyledFlexWrapper width="100%">
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  options={CATEGORIES}
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
                <CustomSelect
                  {...field}
                  options={MONTHS}
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
                <CustomSelect
                  {...field}
                  options={years}
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
