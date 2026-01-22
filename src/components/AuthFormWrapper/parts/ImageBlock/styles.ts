import styled from 'styled-components';
import { StyledFlexWrapper } from '../../../../styled/flex';
import { colors } from '../../../../styled/colors';
import bgImage from '../../../../assets/bank3.png';
import { Link } from 'react-router';

export const StyledImageBlock = styled(StyledFlexWrapper)`
  background-color: ${colors.border};
  background-image: url(${bgImage});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: bottom center;
  width: 100%;
  height: 350px;
  border-radius: 8px;
`;

export const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1rem;
  margin: 1rem;
  background-color: #59519587;
  color: #ffffff;
  border-radius: 15px;
  text-decoration: none;
  align-self: flex-end;
`;

export const StyledImageText = styled.p`
  font-size: 25px;
  text-align: center;
  align-self: center;
  text-transform: uppercase;
  width: 70%;
`;
