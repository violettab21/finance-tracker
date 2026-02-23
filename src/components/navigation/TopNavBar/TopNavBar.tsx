import { StyledTopNavbar, StyledTopNavbarList } from './styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { StyledNavButton, StyledNavLink } from '../styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { lightTheme } from '../../../styled/themes';
import { useTheme } from './hooks/useTheme';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

export default function TopNavBar() {
  const { signOut } = useSignOut();
  const { userData } = useContext(AuthContext);
  const { currentTheme, changeTheme } = useTheme();

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
          control={<Switch defaultChecked color="default" />}
          label={currentTheme === lightTheme ? 'Dark Theme' : 'Light Theme'}
          onChange={() => {
            changeTheme();
          }}
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
