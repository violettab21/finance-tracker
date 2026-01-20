import { StyledCheckbox } from './styles';
import { StyledFlexWrapper } from '../../../styled/flex';
import type { InputHTMLAttributes } from 'react';
import { StyledErrorText } from '../styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  error: string | null;
}

export default function Checkbox({
  labelText,
  error,
  ...props
}: CheckboxProps) {
  return (
    <StyledCheckbox>
      <StyledFlexWrapper direction="row" align="center">
        <label>
          <input type="checkbox" {...props}></input>
          {labelText}
        </label>
      </StyledFlexWrapper>
      {error && <StyledErrorText>{error}</StyledErrorText>}
    </StyledCheckbox>
  );
}
