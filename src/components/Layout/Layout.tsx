import TopNavBar from '../navigation/TopNavBar/TopNavBar';
import LeftNavBar from '../navigation/LeftNavBar/LeftNavBar';
import { Outlet } from 'react-router';
import { StyledLayout, StyledMain, StyledPageWrapper } from './styles';

export default function Layout() {
  return (
    <StyledLayout>
      <TopNavBar />
      <StyledMain>
        <LeftNavBar />
        <StyledPageWrapper>
          <Outlet />
        </StyledPageWrapper>
      </StyledMain>
    </StyledLayout>
  );
}
