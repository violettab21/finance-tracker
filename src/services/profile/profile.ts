import { updateEmail, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import type { ProfileFormInput } from '../../pages/Profile/Profile';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export const updateUserName = async (data: ProfileFormInput) => {
  const currentUser = auth.currentUser;
  if (
    currentUser &&
    currentUser.displayName !== `${data.firstName} ${data.lastName}`
  ) {
    await updateProfile(currentUser, {
      displayName: `${data.firstName} ${data.lastName}`,
    });

    const q = query(
      collection(db, 'users'),
      where('uid', '==', currentUser.uid)
    );
    const result = await getDocs(q);
    const user = result.docs[0];
    const documentId = user.id;

    await updateDoc(doc(db, 'users', documentId), {
      uid: currentUser.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: currentUser.email,
    });
  }
};

export const updateUserEmail = async (data: ProfileFormInput) => {
  const currentUser = auth.currentUser;
  if (currentUser && currentUser.email !== data.email) {
    await updateEmail(currentUser, data.email);

    const q = query(
      collection(db, 'users'),
      where('uid', '==', currentUser.uid)
    );
    const result = await getDocs(q);
    const user = result.docs[0];
    const documentId = user.id;

    await updateDoc(doc(db, 'users', documentId), {
      uid: currentUser.uid,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
  }
};

export const getUser = async (): Promise<{
  firstName: string;
  lastName: string;
  email: string;
} | null> => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const q = query(
      collection(db, 'users'),
      where('uid', '==', currentUser.uid)
    );
    const result = await getDocs(q);
    const user = result.docs[0];
    console.log(user.data());
    return {
      firstName: user.data().firstName,
      lastName: user.data().lastName,
      email: user.data().email,
    };
  }
  return null;
};
