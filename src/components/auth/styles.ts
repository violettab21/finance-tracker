import styled from 'styled-components';
import { Link } from 'react-router';

export const StyledTitle = styled.h1`
  color: ${(props) => props.theme.colors.textPrimary};
`;
export const StyledLinkForm = styled(Link)`
  color: ${(props) => props.theme.colors.textPrimary};
`;
