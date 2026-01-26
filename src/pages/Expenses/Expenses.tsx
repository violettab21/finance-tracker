import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import {
  getExpensesByUser,
  type ExpenseData,
} from '../../services/expenses/expenses';

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);

  const getExpanses = useCallback(async () => {
    const userExpanses = await getExpensesByUser();
    return userExpanses;
  }, []);

  useEffect(() => {
    getExpanses()
      .then((result) => setExpenses(result))
      .catch((err) => console.log(err));
  }, [getExpanses]);

  return (
    <div>
      <Button primary onClick={() => setShowModal(true)}>
        Add Expense
      </Button>
      <Modal
        modalContent={<ExpenseForm getExpanses={getExpanses} />}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <ExpensesList expenses={expenses} />
    </div>
  );
}
