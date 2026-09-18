import { StyledCollapse, StyledExpand, StyledLeftNavBar } from './styles';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useLocation } from 'react-router';
import Menu from '../Menu/Menu';

export default function LeftNavBar() {
  const { userData, loading } = useContext(AuthContext);

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <StyledLeftNavBar isCollapsed={isCollapsed}>
      {isCollapsed ? (
        <StyledExpand onClick={() => setIsCollapsed(!isCollapsed)} />
      ) : (
        <StyledCollapse onClick={() => setIsCollapsed(!isCollapsed)} />
      )}
      <Menu selectedItem={selectedItem} isCollapsed={isCollapsed} />
    </StyledLeftNavBar>
  );
}
