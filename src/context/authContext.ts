import { createContext, type Dispatch, type SetStateAction } from 'react';

export const AuthContext = createContext<{
  userData: {
    userToken: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    userEmail: string | null;
  };
  setUserData: Dispatch<
    SetStateAction<{
      userToken: string | null;
      userFirstName: string | null;
      userLastName: string | null;
      userEmail: string | null;
    }>
  >;
  loading: boolean;
}>({
  userData: {
    userToken: null,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
  },
  setUserData: () => {},
  loading: true,
});
