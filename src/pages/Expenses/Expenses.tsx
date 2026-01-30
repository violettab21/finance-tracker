import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import { StyledFlexWrapper } from '../../styled/flex';
import { categories } from '../../components/Select/CustomSelect';
import { savingCategories } from '../Savings/Savings';
import { MdAddCircle } from 'react-icons/md';
import { StyledButtonExpense, StyledExpensesWrapper } from './styles';
import { MdRemoveCircle } from 'react-icons/md';
import { useExpenses } from './hooks/useExpenses';

import TimePeriodSection from '../../components/expenses/TimePeriodSection/TimePeriodSection';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';

export default function Expenses() {
  const {
    showModal,
    setShowModal,
    month,
    setMonth,
    showModalIncome,
    setShowModalIncome,
    balance,
    getTotalExpenses,
    onExpenseCreate,
    onIncomeCreate,
    isExpensesLoading,
    year,
    setYear,
    setAllExpenses,
    newExpenses,
    newIncomes,
    savedFromPreviousMonths,
  } = useExpenses();

  return (
    <StyledExpensesWrapper direction="column" gap={'1rem'}>
      <StyledFlexWrapper direction="column" gap={'1rem'}>
        <TimePeriodSection
          month={month}
          year={year}
          setYear={setYear}
          setMonth={setMonth}
        />
        <ExpensesSummary
          expenses={getTotalExpenses(newExpenses)}
          incomes={getTotalExpenses(newIncomes)}
          balance={balance}
          saved={savedFromPreviousMonths}
        />
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
            expenses={newExpenses}
            setExpenses={setAllExpenses}
            isLoading={isExpensesLoading}
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
            expenses={newIncomes}
            setExpenses={setAllExpenses}
            isLoading={isExpensesLoading}
          />
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </StyledExpensesWrapper>
  );
}
