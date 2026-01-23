import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

interface ExpenseData {
  category: string;
  cost: number;
  date: string;
}

export async function addExpense(expenseData: ExpenseData) {
  const currentUser = auth.currentUser?.uid;
  await addDoc(collection(db, 'expenses'), {
    category: expenseData.category,
    cost: expenseData.cost,
    date: new Date(expenseData.date),
    userUID: currentUser,
  });
}

export async function getExpensesByUser() {
  const currentUser = auth.currentUser?.uid;
  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser)
  );
  const result = await getDocs(q);
  const expenses = result.docs.map((doc) => doc.data());
  return expenses;
}
