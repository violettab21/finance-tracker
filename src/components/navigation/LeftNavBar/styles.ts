import styled from 'styled-components';

export const StyledLeftNavBar = styled.div`
  background-color: ${(props) => props.theme.colors.navigationBackground};
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    list-style-type: none;
  }
`;
