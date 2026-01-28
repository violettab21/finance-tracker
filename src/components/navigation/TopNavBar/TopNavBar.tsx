import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { StyledTopNavbar, StyledTopNavbarList } from './styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { StyledNavButton, StyledNavLink } from '../styles';

export default function TopNavBar() {
  const { userData } = useContext(AuthContext);
  const { signOut } = useSignOut();

  return (
    <StyledTopNavbar justify="space-between">
      <p>Logo</p>
      {userData.userName ? <p>Hello, {userData.userName}</p> : <p>Hello</p>}
      <StyledTopNavbarList>
        {userData.userToken ? (
          <>
            <li>Profile</li>
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
