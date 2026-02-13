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
      borderColor: '#cccccc',
      color: `white`,
      backgroundColor: `${theme.colors.inputBackground}`,
      width: '100%',
      padding: `0`,
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    valueContainer: (base) => ({
      ...base,
      width: '100%',
    }),
    menu: (base) => ({
      ...base,
      width: '100%',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: !state.isSelected
        ? `${theme.colors.inputBackground}`
        : 'white',
      color: !state.isSelected ? `white` : 'black',
      width: '100%',
    }),
  };
  return <StyledSelect styles={customStyles} {...props} />;
}
