import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
color: ${(props) => props.theme.colors.textPrimary};
background-color: ${(props) => props.theme.colors.backgroundPage};
font-family: "Poppins", sans-serif;
}
`;
