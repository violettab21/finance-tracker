import { useState } from 'react';
import { AuthContext } from './authContext';
import { useCookies } from 'react-cookie';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookies] = useCookies(['user']);

  const [userData, setUserData] = useState<{
    userToken: string | null;
    userName: string | null;
  }>({
    userToken: cookies.user || null,
    userName: 'name',
  });

  return (
    <AuthContext value={{ userData, setUserData }}>{children}</AuthContext>
  );
}
