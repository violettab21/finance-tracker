import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { PasswordResetFormInput } from '../../components/profile/PasswordResetForm/PasswordResetForm';
import type { ProfileFormInput } from '../../components/profile/ProfileEditForm/ProfileEditForm';

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
    if (user) {
      console.log(user.data());
      return {
        firstName: user.data().firstName,
        lastName: user.data().lastName,
        email: user.data().email,
      };
    }
  }
  return null;
};

export const reauthUser = async (data: PasswordResetFormInput) => {
  const currentUser = auth.currentUser;

  if (currentUser && currentUser.email) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.oldPassword
    );
    await reauthenticateWithCredential(currentUser, credential);
  }
};

export const updateUserPassword = async (data: PasswordResetFormInput) => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    await updatePassword(currentUser, data.newPassword);
  }
};

export const deleteUserProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    await deleteUser(user);
  }
};
