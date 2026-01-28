import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import {
  addExpense,
  getExpensesByUser,
  type ExpenseData,
} from '../../services/expenses/expenses';
import Select from 'react-select';
import { customStyles } from '../../components/expenses/ExpenseForm/styles';
import { StyledFlexWrapper } from '../../styled/flex';
import type { FormDataExpense } from '../../components/expenses/ExpenseForm/validation';
import { categories } from '../../components/Select/CustomSelect';
import { savingCategories } from '../Savings/Savings';
import { MdAddCircle } from 'react-icons/md';
import { StyledButtonExpense, StyledExpensesWrapper } from './styles';
import { MdRemoveCircle } from 'react-icons/md';

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
  const [showModalIncome, setShowModalIncome] = useState(false);
  const [incomes, setIncomes] = useState<ExpenseData[]>([]);
  const [balance, setBalance] = useState<number>(0);

  const getExpanses = useCallback(async () => {
    const userExpanses = await getExpensesByUser('expense');
    const filteredExpensesByMonth = userExpanses.filter(
      (expense) => new Date(expense.date).getMonth() === month
    );
    return filteredExpensesByMonth;
  }, [month]);

  const getIncomes = useCallback(async () => {
    const userExpanses = await getExpensesByUser('income');
    const filteredExpensesByMonth = userExpanses.filter(
      (expense) => new Date(expense.date).getMonth() === month
    );
    return filteredExpensesByMonth;
  }, [month]);

  function getTotalExpenses(expenses: ExpenseData[]) {
    const sum = expenses.reduce(
      (accumulator, currentValue) => +accumulator + +currentValue.cost,
      0
    );
    return sum;
  }

  const getBalance = useCallback(async () => {
    const allExpenses = await getExpensesByUser('expense');
    const allIncomes = await getExpensesByUser('income');

    const totalExpenses = getTotalExpenses(allExpenses);
    const totalIncomes = getTotalExpenses(allIncomes);

    return totalIncomes - totalExpenses;
  }, []);

  useEffect(() => {
    getExpanses()
      .then((result) => setExpenses(result))
      .catch((err) => console.log(err));
  }, [getExpanses, month]);

  const onExpenseCreate = async (data: FormDataExpense) => {
    console.log(data);
    try {
      await addExpense({
        category: data.category.value,
        type: 'expense',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userExpanses = await getExpanses();

      setExpenses(userExpanses);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onIncomeCreate = async (data: FormDataExpense) => {
    console.log(data);
    try {
      await addExpense({
        category: data.category.value,
        type: 'income',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userIncomes = await getExpensesByUser('income');

      setIncomes(userIncomes);
      setShowModalIncome(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIncomes()
      .then((result) => setIncomes(result))
      .catch((err) => console.log(err));
  }, [getIncomes, month]);

  useEffect(() => {
    getBalance()
      .then((result) => setBalance(result))
      .catch((err) => console.log(err));
  }, [expenses, incomes, getBalance]);
  return (
    <StyledExpensesWrapper direction="column" gap={'1rem'}>
      <StyledFlexWrapper direction="column" gap={'1rem'}>
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
        <p>Total Month expenses: {getTotalExpenses(expenses)} </p>
        <p>Total Month Income: {getTotalExpenses(incomes)}</p>
        <p>Current Balance: {balance}</p>
      </StyledFlexWrapper>
      <StyledFlexWrapper width="100%" gap={'10px'}>
        <StyledFlexWrapper width="100%" direction="column" gap={'1rem'}>
          <StyledButtonExpense primary onClick={() => setShowModal(true)}>
            <p>Add Expense</p> <MdRemoveCircle size={30} />
          </StyledButtonExpense>
          <Modal
            modalContent={
              <ExpenseForm
                title="Add Expense"
                onSubmit={onExpenseCreate}
                categories={categories}
                editedExpense={null}
              />
            }
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />

          <ExpensesList expenses={expenses} setExpenses={setExpenses} />
        </StyledFlexWrapper>
        <StyledFlexWrapper width="100%" direction="column" gap={'1rem'}>
          <StyledButtonExpense primary onClick={() => setShowModalIncome(true)}>
            <p>Add Expense</p> <MdAddCircle size={30} />
          </StyledButtonExpense>
          <Modal
            modalContent={
              <ExpenseForm
                title="Add Income"
                onSubmit={onIncomeCreate}
                categories={savingCategories}
                editedExpense={null}
              />
            }
            showModal={showModalIncome}
            onClose={() => setShowModalIncome(false)}
          />

          <ExpensesList expenses={incomes} setExpenses={setIncomes} />
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </StyledExpensesWrapper>
  );
}
