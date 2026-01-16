import Login from "../pages/Login";
import Main from "../pages/Main";
import Register from "../pages/Register";
import Tracker from "../pages/Tracker";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const TRACKER_ROUTE = "/finance-tracker";

export const privateRoutes = [{ path: TRACKER_ROUTE, page: <Tracker /> }];
export const publicRoutes = [
  { path: LOGIN_ROUTE, page: <Login /> },
  { path: REGISTER_ROUTE, page: <Register /> },
  { path: "/", page: <Main /> },
];
