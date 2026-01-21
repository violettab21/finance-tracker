import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

export async function signUp(userData: UserData) {
  const register = await createUserWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  const user = register.user;

  await updateProfile(user, {
    displayName: `${userData.firstName} ${userData.lastName}`,
  });

  return user;
}

export async function SignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userData = await signInWithPopup(auth, provider);
  const user = userData.user;

  return user;
}
