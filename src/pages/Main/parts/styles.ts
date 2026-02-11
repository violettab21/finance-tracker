import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';
import { colors } from '../../../styled/colors';

export const StyledMainBlock = styled(StyledFlexWrapper)`
  background-color: ${colors.backgroundDark};
  padding: 2rem;
  border-radius: 8px;
`;

type ImageBlockProps = {
  image: string;
};

export const StyledBlock1 = styled.div<ImageBlockProps>`
  background-color: ${colors.pageBackground};
  padding: 1rem;
  border-radius: 8px;
  background-color: ${colors.border};
  background-image: ${(props) => `url(${props.image});`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  min-width: 200px;
  min-height: 200px;
`;
