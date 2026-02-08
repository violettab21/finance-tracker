import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import type { Plan } from '../../pages/Plans/Plans';

export async function addPlan(planData: Omit<Plan, 'id'>) {
  const currentUser = auth.currentUser?.uid;
  const id = crypto.randomUUID();
  await addDoc(collection(db, 'plans'), {
    id: id,
    category: planData.category,
    cost: planData.cost,
    month: planData.month,
    year: planData.year,
    userUID: currentUser,
  });
  const result = await getAllPlansByUser();
  return result;
}

export async function getAllPlansByUser() {
  const currentUser = auth.currentUser?.uid;

  const q = query(collection(db, 'plans'), where('userUID', '==', currentUser));

  const result = await getDocs(q);

  const plans: Plan[] = result.docs.map((doc) => {
    return {
      id: doc.data().id,
      category: doc.data().category,
      cost: doc.data().cost,
      month: doc.data().month,
      year: doc.data().year,
    };
  });

  return plans;
}

export async function deletePlan(customId: string) {
  const currentUser = auth.currentUser?.uid;

  const q = query(
    collection(db, 'plans'),
    where('userUID', '==', currentUser),
    where('id', '==', customId)
  );
  const result = await getDocs(q);
  const planData = result.docs[0];
  const documentId = planData.id;

  await deleteDoc(doc(db, 'plans', documentId));

  const updatedPlans = await getAllPlansByUser();
  return updatedPlans;
}
