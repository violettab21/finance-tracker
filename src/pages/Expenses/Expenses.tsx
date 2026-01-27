import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import {
  getExpensesByUser,
  type ExpenseData,
} from '../../services/expenses/expenses';
import Select from 'react-select';
import { customStyles } from '../../components/expenses/ExpenseForm/styles';

const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
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
      <Select
        options={months}
        styles={customStyles}
        value={months[month]}
        onChange={(option: unknown) => {
          if (
            typeof option === 'object' &&
            option &&
            'value' in option &&
            'label' in option
          ) {
            const monthIndex = months.findIndex(
              (object) => object.value === option?.value
            );
            setMonth(monthIndex);
          }
        }}
      ></Select>

      <ExpensesList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}
