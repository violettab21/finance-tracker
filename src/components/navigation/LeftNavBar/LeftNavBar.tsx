import { StyledLeftNavBar } from './styles';
import { StyledNavButton } from '../styles';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router';
import {
  EXPENSES_ROUTE,
  OVERVIEW_ROUTE,
  PLANS_ROUTE,
  SAVINGS_ROUTE,
} from '../../../routes/routes';

export default function LeftNavBar() {
  const { userData } = useContext(AuthContext);
  const { signOut } = useSignOut();
  const [selectedItem, setSelectedItem] = useState<string>('/');
  const navigate = useNavigate();

  if (!userData.userToken) {
    return null;
  }
  return (
    <StyledLeftNavBar>
      <div>
        <ul>
          <li>
            <StyledNavButton
              selected={OVERVIEW_ROUTE === selectedItem}
              onClick={() => {
                navigate(OVERVIEW_ROUTE);
                setSelectedItem(OVERVIEW_ROUTE);
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
                setSelectedItem(EXPENSES_ROUTE);
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
                setSelectedItem(PLANS_ROUTE);
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
                setSelectedItem(SAVINGS_ROUTE);
              }}
            >
              Savings
            </StyledNavButton>
          </li>
        </ul>
      </div>

      <div>
        {' '}
        <ul>
          <li>
            <StyledNavButton
              selected={SAVINGS_ROUTE === selectedItem}
              onClick={() => {
                navigate(SAVINGS_ROUTE);
                setSelectedItem(SAVINGS_ROUTE);
              }}
            >
              Profile
            </StyledNavButton>
          </li>
          <li>
            <StyledNavButton onClick={signOut}>Log out</StyledNavButton>
          </li>
        </ul>
      </div>
    </StyledLeftNavBar>
  );
}
