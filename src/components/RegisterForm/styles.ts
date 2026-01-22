import styled from 'styled-components';
import { colors } from '../../styled/colors';
import { Link } from 'react-router';

/*export const StyledRegistrationFormWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;*/

export const StyledTitle = styled.h1`
  color: ${colors.backgroundLight};
`;

export const RegistrationFormWrapper = styled.div`
  background-color: ${colors.formBackground};
`;

export const StyledLinkRegisterForm = styled(Link)`
  color: ${colors.backgroundLight};
`;
