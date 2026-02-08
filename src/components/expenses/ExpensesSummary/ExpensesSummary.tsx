import ExpenseCard from './ExpenseCard';
import { TbArrowBigLeft, TbArrowBigRight } from 'react-icons/tb';
import { FaSackDollar } from 'react-icons/fa6';
import { IoIosWallet } from 'react-icons/io';
import { useContext } from 'react';
import { ExpensesContext } from '../../../context/expensesContext';
import { StyledSummaryWrapper } from './styles';

export default function ExpensesSummary({
  expenses,
  incomes,
  savedFromPreviousMonths,
}: {
  expenses: number;
  incomes: number;
  savedFromPreviousMonths: number;
}) {
  const { balance } = useContext(ExpensesContext);

  return (
    <>
      <h1>Total Balance: {balance}</h1>
      <StyledSummaryWrapper gap={'1rem'}>
        <ExpenseCard
          text={'Month Expenses'}
          value={expenses}
          icon={<TbArrowBigLeft size={30} />}
        />
        <ExpenseCard
          text={'Month Incomes'}
          value={incomes}
          icon={<TbArrowBigRight size={30} />}
        />
        <ExpenseCard
          text={'Previously saved'}
          value={savedFromPreviousMonths}
          icon={<FaSackDollar size={30} />}
        />
        <ExpenseCard
          text={'Saved this month'}
          value={balance - savedFromPreviousMonths}
          icon={<IoIosWallet size={30} />}
        />
      </StyledSummaryWrapper>
    </>
  );
}
