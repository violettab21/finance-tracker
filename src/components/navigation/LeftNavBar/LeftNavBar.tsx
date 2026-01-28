import { StyledLeftNavBar } from './styles';
import { StyledNavButton, StyledNavLink } from '../styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

export default function LeftNavBar() {
  const { userData } = useContext(AuthContext);
  const { signOut } = useSignOut();

  if (!userData.userToken) {
    return null;
  }
  return (
    <StyledLeftNavBar>
      <ul>
        <li>
          <StyledNavLink to="/finance-tracker">Overview</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/expenses">Expenses Management</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/plans">Plans</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/savings">Savings</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/profile-settings">Profile</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/about">About</StyledNavLink>
        </li>
        <li>
          <StyledNavButton onClick={signOut}>Log out</StyledNavButton>
        </li>
      </ul>
    </StyledLeftNavBar>
  );
}
