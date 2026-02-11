import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { auth } from '../firebase-config';
import Loader from '../components/Loader/Loader';
import { onAuthStateChanged } from 'firebase/auth';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<{
    userToken: string | null;
    userName: string | null;
  }>({
    userToken: null,
    userName: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.uid) {
        setUserData({
          userToken: currentUser.email,
          userName: currentUser.displayName,
        });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <AuthContext value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext>
  );
}
