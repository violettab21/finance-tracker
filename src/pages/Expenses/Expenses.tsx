import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import {
  getExpensesByUser,
  type ExpenseData,
} from '../../services/expenses/expenses';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());

  const getExpanses = useCallback(async () => {
    const userExpanses = await getExpensesByUser();
    const filteredExpensesByMonth = userExpanses.filter(
      (expense) => new Date(expense.date).getMonth() === month
    );
    return filteredExpensesByMonth;
  }, [month]);

  useEffect(() => {
    getExpanses()
      .then((result) => setExpenses(result))
      .catch((err) => console.log(err));
  }, [getExpanses, month]);

  return (
    <div>
      <Button primary onClick={() => setShowModal(true)}>
        Add Expense
      </Button>
      <Modal
        modalContent={
          <ExpenseForm setExpenses={setExpenses} getExpanses={getExpanses} />
        }
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <select
        onChange={(event) => {
          const monthIndex = months.indexOf(event.target.value);
          setMonth(monthIndex);
        }}
      >
        {months.map((el, i) => (
          <option key={i}>{el}</option>
        ))}
      </select>
      <ExpensesList expenses={expenses} />
    </div>
  );
}
