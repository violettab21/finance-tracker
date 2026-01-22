import { createContext, type Dispatch, type SetStateAction } from 'react';

export const AuthContext = createContext<{
  userData: {
    userToken: string | null;
    userName: string | null;
  };
  setUserData: Dispatch<
    SetStateAction<{
      userToken: string | null;
      userName: string | null;
    }>
  >;
}>({ userData: { userToken: null, userName: null }, setUserData: () => {} });
