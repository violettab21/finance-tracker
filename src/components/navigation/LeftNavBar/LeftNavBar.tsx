import { StyledLeftNavBar } from './styles';
import { StyledNavButton } from '../styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useLocation, useNavigate } from 'react-router';
import {
  EXPENSES_ROUTE,
  OVERVIEW_ROUTE,
  PLANS_ROUTE,
  PROFILE_ROUTE,
  SAVINGS_ROUTE,
} from '../../../routes/routes';

export default function LeftNavBar() {
  const { userData, loading } = useContext(AuthContext);
  const { signOut } = useSignOut();
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>(location.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const updateSelectedItem = () => {
      setSelectedItem(location.pathname);
    };
    updateSelectedItem();
  }, [location.pathname]);

  if (!userData.userEmail && !loading) {
    return null;
  }
  return (
    <StyledLeftNavBar>
      <ul>
        <li>
          <StyledNavButton
            selected={OVERVIEW_ROUTE === selectedItem}
            onClick={() => {
              navigate(OVERVIEW_ROUTE);
            }}
          >
            Overview
          </StyledNavButton>
        </li>
        <li>
          <StyledNavButton
            selected={EXPENSES_ROUTE === selectedItem}
            onClick={() => {
              navigate(EXPENSES_ROUTE);
            }}
          >
            Expenses Management
          </StyledNavButton>
        </li>
        <li>
          <StyledNavButton
            selected={PLANS_ROUTE === selectedItem}
            onClick={() => {
              navigate(PLANS_ROUTE);
            }}
          >
            Plans
          </StyledNavButton>
        </li>
        <li>
          <StyledNavButton
            selected={SAVINGS_ROUTE === selectedItem}
            onClick={() => {
              navigate(SAVINGS_ROUTE);
            }}
          >
            Savings
          </StyledNavButton>
        </li>
      </ul>{' '}
      <ul>
        <li>
          <StyledNavButton
            selected={PROFILE_ROUTE === selectedItem}
            onClick={() => {
              navigate(PROFILE_ROUTE);
            }}
          >
            Profile
          </StyledNavButton>
        </li>
        <li>
          <StyledNavButton onClick={signOut}>Log out</StyledNavButton>
        </li>
      </ul>
    </StyledLeftNavBar>
  );
}
