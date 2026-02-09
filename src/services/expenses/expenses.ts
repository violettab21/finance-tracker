import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getAggregateFromServer,
  getDocs,
  query,
  sum,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { getMonthName } from '../../helpers/helpers';

export interface ExpenseData {
  id: string;
  type: 'income' | 'expense';
  category: string;
  cost: number;
  date: string;
  notes?: string;
}

export async function addExpense(expenseData: Omit<ExpenseData, 'id'>) {
  const currentUser = auth.currentUser?.uid;
  const id = crypto.randomUUID();
  await addDoc(collection(db, 'expenses'), {
    id: id,
    type: expenseData.type,
    category: expenseData.category,
    cost: expenseData.cost,
    date: new Date(expenseData.date),
    userUID: currentUser,
    notes: expenseData.notes,
  });
  const result = await getAllExpensesByUser();
  return result;
}

export async function getExpensesByUser(type: 'income' | 'expense') {
  const currentUser = auth.currentUser?.uid;
  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser),
    where('type', '==', type)
  );
  const result = await getDocs(q);
  const expenses: ExpenseData[] = result.docs.map((doc) => {
    return {
      id: doc.data().id,
      type: doc.data().type,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
      notes: doc.data().notes,
    };
  });
  console.log(expenses);
  return expenses;
}

export async function getAllExpensesByUser() {
  const currentUser = auth.currentUser?.uid;

  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser)
  );

  const result = await getDocs(q);

  const expenses: ExpenseData[] = result.docs.map((doc) => {
    return {
      id: doc.data().id,
      type: doc.data().type,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
      notes: doc.data().notes,
    };
  });

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
      type: doc.data().type,
      category: doc.data().category,
      cost: doc.data().cost,
      date: doc.data().date.toDate().toLocaleString(),
      notes: doc.data().notes,
    };
  });
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

  const updatedExpenses = await getAllExpensesByUser();
  return updatedExpenses;
}

export async function editExpense(updatedExpenseData: ExpenseData) {
  const currentUser = auth.currentUser?.uid;

  const q = query(
    collection(db, 'expenses'),
    where('userUID', '==', currentUser),
    where('id', '==', updatedExpenseData.id)
  );
  const result = await getDocs(q);
  const expense = result.docs[0];
  const documentId = expense.id;

  await updateDoc(doc(db, 'expenses', documentId), {
    id: updatedExpenseData.id,
    type: updatedExpenseData.type,
    category: updatedExpenseData.category,
    cost: updatedExpenseData.cost,
    date: new Date(updatedExpenseData.date),
    notes: updatedExpenseData.notes,
  });

  const updatedExpenses = await getAllExpensesByUser();
  return updatedExpenses;
}

export function getTotalSavingPerDate(expenses: ExpenseData[]) {
  const dates: Map<string, number> = new Map();
  expenses.sort((a, b) => Number(new Date(a.date)) - Number(new Date(b.date)));
  expenses.forEach((expense) => {
    const dateHash = `${new Date(expense.date).getMonth()}-${new Date(expense.date).getFullYear()}`;
    if (!dates.has(dateHash)) {
      dates.set(
        dateHash,
        expense.type === 'income' ? expense.cost : -expense.cost
      );
    } else {
      const currentSaved: number = dates.get(dateHash) as number;
      dates.set(
        dateHash,
        expense.type === 'income'
          ? currentSaved + expense.cost
          : currentSaved - expense.cost
      );
    }
  });

  const datesArray: { year: string; saved: number; month: string }[] = [];

  dates.forEach((value, key) =>
    datesArray.push({
      year: key.split('-')[1],
      month: getMonthName(Number(key.split('-')[0])),
      saved: value,
    })
  );

  return datesArray;
}
