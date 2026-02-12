import { createContext, type Dispatch, type SetStateAction } from 'react';

export const AuthContext = createContext<{
  userData: {
    userEmail: string | null;
    userFullName: string | null;
  };
  setUserData: Dispatch<
    SetStateAction<{
      userEmail: string | null;
      userFullName: string | null;
    }>
  >;
  loading: boolean;
}>({
  userData: {
    userEmail: null,
    userFullName: null,
  },
  setUserData: () => {},
  loading: true,
});
