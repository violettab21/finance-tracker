import { customStyles, StyledSelect } from './styles';

export interface Option {
  value: string;
  label: string;
}

export default function CustomSelect({ ...props }) {
  return <StyledSelect styles={customStyles} {...props} />;
}
