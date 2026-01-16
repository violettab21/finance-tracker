import { Route, Routes } from 'react-router';
import { privateRoutes, publicRoutes } from '../routes/routes';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
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
