import Expenses from '../pages/Expenses/Expenses';
import Login from '../pages/Login/Login';
import Main from '../pages/Main';
import Overview from '../pages/Overview/Overview';
import Plans from '../pages/Plans/Plans';
import Register from '../pages/Register/Register';
import Savings from '../pages/Savings/Savings';

export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const OVERVIEW_ROUTE = '/overview';
export const EXPENSES_ROUTE = '/finance-tracker';
export const SAVINGS_ROUTE = '/savings';
export const PLANS_ROUTE = '/plans';

export const privateRoutes = [
  { path: OVERVIEW_ROUTE, page: <Overview /> },
  { path: EXPENSES_ROUTE, page: <Expenses /> },
  { path: SAVINGS_ROUTE, page: <Savings /> },
  { path: PLANS_ROUTE, page: <Plans /> },
];
export const publicRoutes = [
  { path: LOGIN_ROUTE, page: <Login /> },
  { path: REGISTER_ROUTE, page: <Register /> },
  { path: '/', page: <Main /> },
];
