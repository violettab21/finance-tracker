import {
  StyledHamburger,
  StyledHamburgerMenu,
  StyledTopNavbar,
  StyledTopNavbarList,
} from './styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { StyledNavButton, StyledNavLink } from '../styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { lightTheme } from '../../../styled/themes';
import { useTheme } from './hooks/useTheme';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useLocation } from 'react-router';
import Hamburger from 'hamburger-react';
import Menu from '../Menu/Menu';

export default function TopNavBar() {
  const { signOut } = useSignOut();
  const { userData } = useContext(AuthContext);
  const { currentTheme, changeTheme } = useTheme();
  const [isOpen, setOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    function closeHamburger() {
      setOpen(false);
    }
    closeHamburger();
  }, [location]);

  useEffect(() => {
    function changeOverflow() {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
    changeOverflow();
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

      <StyledHamburger>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </StyledHamburger>

      {isOpen && (
        <StyledHamburgerMenu>
          <Hamburger toggled={isOpen} toggle={setOpen} />
          <Menu />
        </StyledHamburgerMenu>
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
