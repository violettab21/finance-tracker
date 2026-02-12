import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
}

interface UserDataSignIn {
  email: string;
  password: string;
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
  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: user.email,
  });

  return user;
}

export async function signIn(userData: UserDataSignIn) {
  const register = await signInWithEmailAndPassword(
    auth,
    userData.email,
    userData.password
  );
  const user = register.user;

  return user;
}

export async function SignInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const userData = await signInWithPopup(auth, provider);
  const user = userData.user;

  await addDoc(collection(db, 'users'), {
    uid: user.uid,
    firstName: user.email,
    lastName: '',
    email: user.email,
  });

  return user;
}

export async function signOutUser() {
  await signOut(auth);
}
