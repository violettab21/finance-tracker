import type { StylesConfig } from 'react-select';
import styled from 'styled-components';
import { colors } from '../../styled/colors';
import Select from 'react-select';

export const customStyles: StylesConfig<unknown, false> = {
  control: (base) => ({
    ...base,
    borderColor: '#cccccc',
    color: `white`,
    backgroundColor: `${colors.inputBackground}`,
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
    backgroundColor: !state.isSelected ? `${colors.inputBackground}` : 'white',
    color: !state.isSelected ? `white` : 'black',
    width: '100%',
  }),
};

export const StyledSelect = styled(Select)`
  color: ${colors.textLight};
  width: 100%;
  padding: 0;
  cursor: pointer;
`;
