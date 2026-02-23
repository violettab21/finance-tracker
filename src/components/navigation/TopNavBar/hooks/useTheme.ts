import { useContext } from 'react';
import { darkTheme, lightTheme } from '../../../../styled/themes';
import { ThemeContext } from '../../../../context/themeContext';

export const useTheme = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    if (currentTheme === lightTheme) {
      setCurrentTheme(darkTheme);
      localStorage.setItem('finTrack', JSON.stringify({ theme: 'dark' }));
    } else {
      setCurrentTheme(lightTheme);
      localStorage.setItem('finTrack', JSON.stringify({ theme: 'light' }));
    }
  };
  return {
    currentTheme,
    changeTheme,
  };
};
