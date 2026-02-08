import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/expenses/ExpensesList/ExpensesList';
import { StyledFlexWrapper } from '../../styled/flex';
import { savingCategories } from '../Savings/Savings';
import { MdAddCircle } from 'react-icons/md';
import { StyledButtonExpense, StyledExpensesWrapper } from './styles';
import { MdRemoveCircle } from 'react-icons/md';
import { useExpenses } from './hooks/useExpenses';

import TimePeriodSection from '../../components/TimePeriodSection/TimePeriodSection';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { getTotalExpenses } from '../../helpers/expenses';
import { CATEGORIES } from '../../constants/constants';

export default function Expenses() {
  const {
    showModal,
    setShowModal,
    showModalIncome,
    setShowModalIncome,
    onExpenseCreate,
    onIncomeCreate,
    month,
    setMonth,
    year,
    setYear,
    savedFromPreviousMonths,
    expenses,
    incomes,
  } = useExpenses();

  const { isExpensesLoading } = useContext(ExpensesContext);

  return (
    <StyledExpensesWrapper direction="column" gap={'1rem'} align="center">
      <StyledFlexWrapper direction="column" gap={'1rem'} align="center">
        <TimePeriodSection
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
        <StyledFlexWrapper width={'70%'} direction="column" align="center">
          <ExpensesSummary
            expenses={getTotalExpenses(expenses)}
            incomes={getTotalExpenses(incomes)}
            savedFromPreviousMonths={savedFromPreviousMonths}
          />
        </StyledFlexWrapper>
      </StyledFlexWrapper>
      <StyledFlexWrapper width="100%" gap={'10px'}>
        <StyledFlexWrapper width="100%" direction="column" gap={'1rem'}>
          <StyledButtonExpense
            primary
            onClick={() => {
              setShowModal(true);
            }}
          >
            <p>Add Expense</p> <MdRemoveCircle size={30} />
          </StyledButtonExpense>
          <Modal
            modalContent={
              <ExpenseForm
                title="Add Expense"
                onSubmit={onExpenseCreate}
                categories={CATEGORIES}
                editedExpense={null}
              />
            }
            showModal={showModal}
            onClose={() => setShowModal(false)}
          />

          <ExpensesList expenses={expenses} isLoading={isExpensesLoading} />
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

          <ExpensesList expenses={incomes} isLoading={isExpensesLoading} />
        </StyledFlexWrapper>
      </StyledFlexWrapper>
    </StyledExpensesWrapper>
  );
}
