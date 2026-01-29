import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import Select from 'react-select';
import { customStyles } from '../../components/expenses/ExpenseForm/styles';
import { StyledFlexWrapper } from '../../styled/flex';
import { categories } from '../../components/Select/CustomSelect';
import { savingCategories } from '../Savings/Savings';
import { MdAddCircle } from 'react-icons/md';
import { StyledButtonExpense, StyledExpensesWrapper } from './styles';
import { MdRemoveCircle } from 'react-icons/md';
import { useExpenses } from './hooks/useExpenses';

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
  const {
    showModal,
    setShowModal,
    expenses,
    month,
    showModalIncome,
    setShowModalIncome,
    incomes,
    balance,
    getTotalExpenses,
    onExpenseCreate,
    onIncomeCreate,
    setExpenses,
    setIncomes,
    setMonth,
    isExpensesLoading,
    isIncomesLoading,
    year,
    setYear,
    saved,
    getIncomes,
    getExpanses,
  } = useExpenses();
  const years = generateYears();
  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 2020; i <= currentYear; i++) {
      years.push(i);
    }
    return years.map((year) => {
      return {
        value: year.toString(),
        label: year.toString(),
      };
    });
  }
  return (
    <StyledExpensesWrapper direction="column" gap={'1rem'}>
      <StyledFlexWrapper direction="column" gap={'1rem'}>
        <p>Current Balance: {balance}</p>
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
        <Select
          options={years}
          styles={customStyles}
          value={years.find((yearEl) => yearEl.value === year.toString())}
          onChange={(option: unknown) => {
            if (
              typeof option === 'object' &&
              option &&
              'value' in option &&
              'label' in option
            ) {
              const selectedYear = years.find(
                (yearEl) => yearEl.value === option?.value
              );
              if (selectedYear) {
                setYear(Number(selectedYear.value));
              }
            }
          }}
        ></Select>
        <p>Total Month expenses: {getTotalExpenses(expenses)} </p>
        <p>Total Month Income: {getTotalExpenses(incomes)}</p>
        <p>Previously saved: {saved}</p>
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

          <ExpensesList
            expenses={expenses}
            setExpenses={setExpenses}
            isLoading={isExpensesLoading}
            getExpenses={getExpanses}
          />
        </StyledFlexWrapper>
        <StyledFlexWrapper width="100%" direction="column" gap={'1rem'}>
          <StyledButtonExpense primary onClick={() => setShowModalIncome(true)}>
            <p>Add Income</p> <MdAddCircle size={30} />
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

          <ExpensesList
            expenses={incomes}
            setExpenses={setIncomes}
            isLoading={isIncomesLoading}
            getExpenses={getIncomes}
          />
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </StyledExpensesWrapper>
  );
}
