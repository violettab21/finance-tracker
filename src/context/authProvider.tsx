import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { auth } from '../firebase-config';
import Loader from '../components/Loader/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { StyledFlexWrapper } from '../styled/flex';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<{
    userEmail: string | null;
    userFullName: string | null;
  }>({
    userEmail: null,
    userFullName: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser?.uid) {
          setUserData({
            userEmail: currentUser.email,
            userFullName: currentUser.displayName,
          });
          setLoading(false);
        } else {
          setUserData({
            userEmail: null,
            userFullName: null,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <StyledFlexWrapper height="100vh">
        <Loader />
      </StyledFlexWrapper>
    );
  }
  return (
    <AuthContext value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext>
  );
}
