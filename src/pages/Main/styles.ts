import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledMainSectionWrapper = styled(StyledFlexWrapper)`
  background-color: ${(props) => props.theme.colors.backgroundSection};
  padding: 2rem;
  border-radius: 8px;
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const StyledMainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 80%;
`;
