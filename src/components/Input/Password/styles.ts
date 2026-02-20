import { styled } from 'styled-components';

export const StyledPassword = styled.div`
  position: relative;
  width: 100%;

  button {
    position: absolute;
    right: 10px;
    border: none;
    background: none;
    top: 35%;
    cursor: pointer;
    color: ${(props) => props.theme.colors.textLight};
  }
`;
