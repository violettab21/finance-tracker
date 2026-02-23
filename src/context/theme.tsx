import { useState } from 'react';
import { ThemeProvider, type DefaultTheme } from 'styled-components';
import { ThemeContext } from './themeContext';
import { darkTheme, lightTheme } from '../styled/themes';
import { getItem } from '../helpers/localStorage';

export const Theme = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = getItem('finTrack');
  const [currentTheme, setCurrentTheme] = useState<DefaultTheme>(
    storedTheme && typeof storedTheme === 'object' && 'theme' in storedTheme
      ? storedTheme?.theme === 'dark'
        ? darkTheme
        : lightTheme
      : darkTheme
  );

  return (
    <ThemeContext value={{ currentTheme, setCurrentTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext>
  );
};
