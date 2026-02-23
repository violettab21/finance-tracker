import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../styled/flex';

export const StyledMainBlock = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.backgroundSection};
  padding: 2rem;
  border-radius: 8px;
`;

type ImageBlockProps = {
  image: string;
};

export const StyledBlock1 = styled.div<ImageBlockProps>`
  background-color: ${(props) => props.theme.colors.backgroundImage};
  padding: 1rem;
  border-radius: 8px;
  background-image: ${(props) => `url(${props.image});`};
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  min-width: 200px;
  min-height: 200px;
`;
