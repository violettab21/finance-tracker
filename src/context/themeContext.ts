import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { DefaultTheme } from 'styled-components';
import { darkTheme } from '../styled/themes';

export const ThemeContext = createContext<{
  currentTheme: DefaultTheme;
  setCurrentTheme: Dispatch<SetStateAction<DefaultTheme>>;
}>({
  currentTheme: darkTheme,
  setCurrentTheme: () => {},
});
