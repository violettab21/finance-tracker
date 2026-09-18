import styled from 'styled-components';
import Select from 'react-select';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledSelect = styled(Select)`
  width: 20%;
`;

export const StyledPlanButton = styled(StyledFlexWrapper)`
  max-width: 200px;
`;

export const StyledPlanFilter = styled(StyledFlexWrapper)`
  max-width: 200px;
  height: 100%;
`;

export const StyledPlansWrapper = styled(StyledFlexWrapper)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;
