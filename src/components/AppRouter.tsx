import { Route, Routes } from 'react-router';
import { privateRoutes, publicRoutes } from '../routes/routes';
import NotFoundPage from '../pages/NotFoundPage';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function AppRouter() {
  const authState = useContext(AuthContext);
  console.log(authState);
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.page} />
      ))}
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.page} />
      ))}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
