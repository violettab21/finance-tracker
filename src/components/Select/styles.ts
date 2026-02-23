import styled from 'styled-components';
import Select from 'react-select';

export const StyledSelect = styled(Select)`
  color: ${(props) => props.theme.colors.textPrimary};
  width: 100%;
  padding: 0;
  cursor: pointer;
`;
