import { useEffect, useState } from 'react';
import { AuthContext } from './authContext';
import { auth } from '../firebase-config';
import Loader from '../components/Loader/Loader';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '../services/profile/profile';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<{
    userToken: string | null;
    userFirstName: string | null;
    userLastName: string | null;
    userEmail: string | null;
  }>({
    userToken: null,
    userFirstName: null,
    userLastName: null,
    userEmail: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const userDetails = await getUser();
        if (currentUser?.uid && userDetails) {
          setUserData({
            userToken: currentUser.email,
            userFirstName: userDetails.firstName,
            userLastName: userDetails.lastName,
            userEmail: userDetails.email,
          });
          setLoading(false);
        } else {
          setUserData({
            userToken: null,
            userFirstName: null,
            userLastName: null,
            userEmail: null,
          });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
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
