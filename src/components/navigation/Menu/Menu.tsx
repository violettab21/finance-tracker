import { StyledNavButton } from '../styles';
import {
  EXPENSES_ROUTE,
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  PLANS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SAVINGS_ROUTE,
} from '../../../routes/routes';
import { FaChartBar, FaTasks, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { MdOutlineAttachMoney, MdSavings } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { useSignOut } from '../../auth/hooks/useSignOut';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';

interface MenuProps {
  isCollapsed?: boolean;
  selectedItem?: string;
}

export default function Menu({ selectedItem, isCollapsed }: MenuProps) {
  const navigate = useNavigate();
  const { signOut } = useSignOut();
  const { userData } = useContext(AuthContext);
  return (
    <div>
      {userData.userEmail && (
        <ul>
          <li>
            <StyledNavButton
              align={isCollapsed ? 'center' : 'start'}
              selected={OVERVIEW_ROUTE === selectedItem}
              onClick={() => {
                navigate(OVERVIEW_ROUTE);
              }}
            >
              {isCollapsed ? <FaChartBar /> : 'Overview'}
            </StyledNavButton>
          </li>
          <li>
            <StyledNavButton
              align={isCollapsed ? 'center' : 'start'}
              selected={EXPENSES_ROUTE === selectedItem}
              onClick={() => {
                navigate(EXPENSES_ROUTE);
              }}
            >
              {isCollapsed ? <MdOutlineAttachMoney /> : 'Expenses Management'}
            </StyledNavButton>
          </li>
          <li>
            <StyledNavButton
              align={isCollapsed ? 'center' : 'start'}
              selected={PLANS_ROUTE === selectedItem}
              onClick={() => {
                navigate(PLANS_ROUTE);
              }}
            >
              {isCollapsed ? <FaTasks /> : 'Plans'}
            </StyledNavButton>
          </li>
          <li>
            <StyledNavButton
              align={isCollapsed ? 'center' : 'start'}
              selected={SAVINGS_ROUTE === selectedItem}
              onClick={() => {
                navigate(SAVINGS_ROUTE);
              }}
            >
              {isCollapsed ? <MdSavings /> : 'Savings'}
            </StyledNavButton>
          </li>
        </ul>
      )}

      <ul>
        {userData.userEmail ? (
          <>
            <li>
              <StyledNavButton
                align={isCollapsed ? 'center' : 'start'}
                selected={PROFILE_ROUTE === selectedItem}
                onClick={() => {
                  navigate(PROFILE_ROUTE);
                }}
              >
                {isCollapsed ? <FaUserCircle /> : 'Profile'}
              </StyledNavButton>
            </li>
            <li>
              <StyledNavButton
                onClick={signOut}
                align={isCollapsed ? 'center' : 'start'}
              >
                {isCollapsed ? <IoLogOut /> : 'Log Out'}
              </StyledNavButton>
            </li>
          </>
        ) : (
          <>
            <li>
              <StyledNavButton
                onClick={() => {
                  navigate(LOGIN_ROUTE);
                }}
              >
                Sign In
              </StyledNavButton>
            </li>
            <li>
              <StyledNavButton
                onClick={() => {
                  navigate(REGISTER_ROUTE);
                }}
              >
                Sign Up
              </StyledNavButton>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
