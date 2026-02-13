import 'styled-components';
import { type Theme } from './styled/colors';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Theme;
  }
}
