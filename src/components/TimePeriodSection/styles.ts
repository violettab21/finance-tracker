import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledButtonMonth = styled.button`
  background: ${(props) => props.theme.colors.inputBackground};
  cursor: pointer;
  padding: 0 10px;
  color: #ffffff;
  border-color: #cccccc;
  border-radius: 4px;
  border-style: ridge;
`;

export const StyledTimeWrapper = styled(StyledFlexWrapper)`
  min-width: 350px;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;
