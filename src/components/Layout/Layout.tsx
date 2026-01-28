import TopNavBar from '../navigation/TopNavBar/TopNavBar';
import LeftNavBar from '../navigation/LeftNavBar/LeftNavBar';
import { Outlet } from 'react-router';
import { StyledLayout, StyledMain } from './styles';

export default function Layout() {
  return (
    <StyledLayout>
      <TopNavBar />
      <StyledMain>
        <LeftNavBar />
        <Outlet />
      </StyledMain>
    </StyledLayout>
  );
}
