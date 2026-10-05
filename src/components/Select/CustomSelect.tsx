import type { StylesConfig } from 'react-select';
import { StyledSelect } from './styles';
import { useTheme } from 'styled-components';

export interface Option {
  value: string;
  label: string;
}

export default function CustomSelect({ ...props }) {
  const theme = useTheme();
  const customStyles: StylesConfig<unknown, false> = {
    control: (base) => ({
      ...base,
      border: 'none',
      color: `white`,
      backgroundColor: `${theme.colors.inputBackground}`,
      padding: `0`,
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    valueContainer: (base) => ({
      ...base,
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: `${theme.colors.inputBackground}`,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: !state.isSelected
        ? `${theme.colors.inputBackground}`
        : 'white',
      color: !state.isSelected ? `white` : 'black',
    }),
  };
  return <StyledSelect styles={customStyles} {...props} />;
}
