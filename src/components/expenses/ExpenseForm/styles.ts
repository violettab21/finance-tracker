import styled from 'styled-components';
import { colors } from '../../../styled/colors';
import Select from 'react-select';
import { type StylesConfig } from 'react-select';

export const StyledTitle = styled.h1`
  color: black;
`;

export const customStyles: StylesConfig<unknown, false> = {
  control: (base) => ({
    ...base,
    borderColor: '#cccccc',
    color: ` ${colors.text}`,
    backgroundColor: `${colors.inputBackground}`,
    width: '100%',
    padding: `0`,
  }),
  menu: (base) => ({
    ...base,
    width: '100%',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: !state.isSelected ? `${colors.inputBackground}` : 'white',
    width: '100%',
  }),
};

export const StyledSelect = styled(Select)`
  color: ${colors.text};
  background-color: ${colors.inputBackground};
  width: 100%;
  padding: 0;
`;
