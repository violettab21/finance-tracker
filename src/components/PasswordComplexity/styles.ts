import styled from 'styled-components';
import { colors } from '../../styled/colors';

interface StyledComplexityBoxProps {
  $indicatorColor: string;
  $isFilled?: boolean;
}

export const StyledComplexityBox = styled.div<StyledComplexityBoxProps>`
  border-radius: 4px;
  padding: 0.1rem;
  border: ${({ $indicatorColor }) => `1px solid ${$indicatorColor};`};
  width: 25%;
  background-color: ${({ $indicatorColor, $isFilled }) =>
    $isFilled ? `${$indicatorColor};` : `white;`};
`;

export const StyledComplexityText = styled.p`
  color: ${colors.text};
  margin-left: 5px;
`;
