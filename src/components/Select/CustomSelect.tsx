import type { SelectHTMLAttributes } from 'react';
import { StyledErrorText, StyledSelect } from './styles';
import { StyledFlexWrapper } from '../../styled/flex';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error: string | null;
  options: Option[];
}

export interface Option {
  value: string;
  label: string;
}

export const categories: Option[] = [
  { value: 'Home', label: 'Home' },
  { value: 'Food', label: 'Food' },
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Health', label: 'Health' },
  { value: 'Car', label: 'Car' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Taxi', label: 'Taxi' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Car', label: 'Car' },
  { value: 'Network', label: 'Network' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Pets', label: 'Pets' },
  { value: 'Gifts', label: 'Gifts' },
  { value: 'Cloth', label: 'Cloth' },
];

export default function CustomSelect({
  error,
  options,
  ...props
}: SelectProps) {
  return (
    <StyledFlexWrapper direction="column" width="100%">
      <StyledSelect {...props}>
        {options.map((option) => (
          <option key={option.label}>{option.value}</option>
        ))}
      </StyledSelect>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledFlexWrapper>
  );
}
