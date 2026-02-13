import { useState } from 'react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import { darkTheme } from '../styled/themes';
import { ThemeContext } from './themeContext';

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(darkTheme);

  return (
    <ThemeContext value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext>
  );
};
