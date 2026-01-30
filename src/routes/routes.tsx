import Expenses from '../pages/Expenses/Expenses';
import Login from '../pages/Login/Login';
import Main from '../pages/Main';
import Register from '../pages/Register/Register';
import Savings from '../pages/Savings/Savings';
import Tracker from '../pages/Tracker';

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const TRACKER_ROUTE = '/finance-tracker';
export const EXPENSES_ROUTE = '/expenses';
export const SAVINGS_ROUTE = '/savings';

export const privateRoutes = [
  { path: TRACKER_ROUTE, page: <Tracker /> },
  { path: EXPENSES_ROUTE, page: <Expenses /> },
  { path: SAVINGS_ROUTE, page: <Savings /> },
];
export const publicRoutes = [
  { path: LOGIN_ROUTE, page: <Login /> },
  { path: REGISTER_ROUTE, page: <Register /> },
  { path: '/', page: <Main /> },
];
