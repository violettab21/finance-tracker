import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getAggregateFromServer,
  getDocs,
  query,
  sum,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';

export interface ExpenseData {
  id: string;
  category: string;
  cost: number;
  date: string;
}

export async function addExpense(expenseData: Omit<ExpenseData, 'id'>) {
  const currentUser = auth.currentUser?.uid;
  const id = crypto.randomUUID();
  await addDoc(collection(db, 'expenses'), {
    id: id,
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
  const expenses: ExpenseData[] = result.docs.map((doc) => {
    return {
      id: doc.data().id,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
    };
  });
  console.log(expenses);
  return expenses;
}

export async function getTotalByCategory(category: string) {
  const currentUser = auth.currentUser?.uid;
  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser),
    where('category', '==', category)
  );
  const snapshot = await getAggregateFromServer(q, {
    totalCost: sum('cost'),
  });

  console.log('totalCost: ', snapshot.data().totalCost);
}

export function getTotalExpensesPerCategory(expenses: ExpenseData[]) {
  console.log(expenses);
  const categories: Map<string, number> = new Map();
  expenses.forEach((expense) => {
    if (!categories.has(expense.category)) {
      categories.set(expense.category, expense.cost);
    } else {
      const currentCost: number = categories.get(expense.category) as number;
      categories.set(expense.category, currentCost + expense.cost);
    }
  });
  console.log('sum');
  console.log(categories);
  const categoriesArray: { category: string; cost: number }[] = [];
  categories.forEach((value, key) =>
    categoriesArray.push({ category: key, cost: value })
  );

  return categoriesArray;
}

export async function getExpensesByCategory(category: string) {
  const currentUser = auth.currentUser?.uid;
  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser),
    where('category', '==', category)
  );
  const result = await getDocs(q);
  const expenses: ExpenseData[] = result.docs.map((doc) => {
    return {
      id: doc.data().id,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
    };
  });
  console.log(expenses);
  return expenses;
}

export async function deleteExpense(customId: string) {
  const currentUser = auth.currentUser?.uid;

  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser),
    where('id', '==', customId)
  );
  const result = await getDocs(q);
  const expenseData = result.docs[0];
  const documentId = expenseData.id;

  await deleteDoc(doc(db, 'expenses', documentId));

  const q2 = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser)
  );
  const result2 = await getDocs(q2);
  const expenses: ExpenseData[] = result2.docs.map((doc) => {
    return {
      id: doc.data().id,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
    };
  });
  console.log(expenses);
  return expenses;
}
