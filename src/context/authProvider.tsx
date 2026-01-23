import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader/Loader';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<{
    userToken: string | null;
    userName: string | null;
  }>({
    userToken: null,
    userName: null,
  });

  useEffect(() => {
    const updateUser = () => {
      if (currentUser?.uid) {
        setUserData({
          userToken: currentUser.email,
          userName: currentUser.displayName,
        });
      } else {
        setUserData({ userToken: null, userName: null });
      }
    };
    updateUser();
  }, [currentUser]);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext value={{ userData, setUserData }}>{children}</AuthContext>
  );
}
