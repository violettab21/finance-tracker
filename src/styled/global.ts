import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const Global = createGlobalStyle`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
color: ${colors.text}

}
`;
