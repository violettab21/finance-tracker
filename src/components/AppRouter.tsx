import { Route, Routes } from 'react-router';
import { privateRoutes, publicRoutes } from '../routes/routes';
import NotFoundPage from '../pages/NotFoundPage';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Layout from './Layout/Layout';

export default function AppRouter() {
  const { userData } = useContext(AuthContext);
  return (
    <Routes>
      <Route element={<Layout />}>
        {userData
          ? publicRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.page} />
            ))
          : privateRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.page} />
            ))}
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
