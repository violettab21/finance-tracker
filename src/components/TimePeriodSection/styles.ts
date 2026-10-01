import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledButtonMonth = styled.button`
  background: ${(props) => props.theme.colors.inputBackground};
  cursor: pointer;
  padding: 0 10px;
  color: #ffffff;
  border-radius: 50%;
  border: none;
  width: 40px;
  height: 40px;
`;

export const StyledTimeWrapper = styled(StyledFlexWrapper)`
  min-width: 350px;
  width: 50%;

  @media (max-width: 768px) {
    gap: 0.5rem;
    width: 100%;
  }

  @media (max-width: 1020px) {
    width: 100%;
  }
`;
