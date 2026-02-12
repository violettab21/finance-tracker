import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import {
  EXPENSES_ROUTE,
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  PLANS_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SAVINGS_ROUTE,
} from '../routes/routes';
import NotFoundPage from '../pages/NotFoundPage';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Layout from './Layout/Layout';
import Overview from '../pages/Overview/Overview';
import Expenses from '../pages/Expenses/Expenses';
import Savings from '../pages/Savings/Savings';
import Plans from '../pages/Plans/Plans';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Loader from './Loader/Loader';
import Profile from '../pages/Profile/Profile';

export const RedirectIfProtected = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userData, loading } = useContext(AuthContext);
  if (loading) {
    return <Loader />;
  }
  if (!userData.userEmail && !loading) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return <>{children}</>;
};

export const RedirectIfAuth = ({ children }: { children: React.ReactNode }) => {
  const { userData, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (userData.userEmail && !loading) {
    return <Navigate to={OVERVIEW_ROUTE} replace />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: OVERVIEW_ROUTE,
        element: (
          <RedirectIfProtected>
            <Overview />
          </RedirectIfProtected>
        ),
      },
      {
        path: EXPENSES_ROUTE,
        element: (
          <RedirectIfProtected>
            <Expenses />
          </RedirectIfProtected>
        ),
      },
      {
        path: SAVINGS_ROUTE,
        element: (
          <RedirectIfProtected>
            <Savings />
          </RedirectIfProtected>
        ),
      },
      {
        path: PLANS_ROUTE,
        element: (
          <RedirectIfProtected>
            <Plans />
          </RedirectIfProtected>
        ),
      },
      { path: '/', element: <Main /> },
      {
        path: LOGIN_ROUTE,
        element: (
          <RedirectIfAuth>
            <Login />
          </RedirectIfAuth>
        ),
      },
      {
        path: REGISTER_ROUTE,
        element: (
          <RedirectIfAuth>
            <Register />
          </RedirectIfAuth>
        ),
      },
      {
        path: PROFILE_ROUTE,
        element: (
          <RedirectIfProtected>
            <Profile />
          </RedirectIfProtected>
        ),
      },
      {
        path: '/*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
