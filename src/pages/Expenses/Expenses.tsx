import { useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';

export default function Expenses() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button primary onClick={() => setShowModal(true)}>
        Add Expense
      </Button>
      <Modal
        modalContent={<ExpenseForm />}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <ExpensesList />
    </div>
  );
}
