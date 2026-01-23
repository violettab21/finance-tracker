import styled from 'styled-components';
import { StyledFlexWrapper } from '../../styled/flex';

export const StyledLoaderWrapper = styled(StyledFlexWrapper)`
  height: 100vh;
`;

export const StyledLoader = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgb(121, 121, 139);
  border-top-color: white;
  animation: loading 1s linear infinite;
  margin: 1rem;

  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
