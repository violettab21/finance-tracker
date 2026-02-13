import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { StyledTopNavbar, StyledTopNavbarList } from './styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { StyledNavButton, StyledNavLink } from '../styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ThemeContext } from '../../../context/themeContext';
import { darkTheme, lightTheme } from '../../../styled/themes';

export default function TopNavBar() {
  const { userData } = useContext(AuthContext);
  const { signOut } = useSignOut();
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  return (
    <StyledTopNavbar justify="space-between">
      <div>
        <StyledNavLink to="/">Home</StyledNavLink>
      </div>
      {userData.userEmail ? (
        <p>Hello, {userData.userFullName}</p>
      ) : (
        <p>Hello</p>
      )}

      <StyledTopNavbarList>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label={currentTheme === lightTheme ? 'Light Theme' : 'Dark Theme'}
          onChange={() =>
            currentTheme === lightTheme
              ? setCurrentTheme(darkTheme)
              : setCurrentTheme(lightTheme)
          }
        />
        {userData.userEmail ? (
          <>
            <li>
              <StyledNavLink to="/profile">Profile</StyledNavLink>
            </li>
            <li>
              <StyledNavButton onClick={signOut}>Log out</StyledNavButton>
            </li>
          </>
        ) : (
          <>
            <li>
              <StyledNavLink to="login">Sign In</StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="register">Sign Up</StyledNavLink>
            </li>
          </>
        )}
      </StyledTopNavbarList>
    </StyledTopNavbar>
  );
}
