import { StyledCheckbox } from './styles';
import { StyledFlexWrapper } from '../../styled/flex';

interface CheckboxProps {
  labelText: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <StyledCheckbox>
      <StyledFlexWrapper direction="row" align="center">
        <input type="checkbox"></input>
        <label>{props.labelText}</label>
      </StyledFlexWrapper>
    </StyledCheckbox>
  );
}
