import { StyledSummaryWrapper } from '../../../pages/Expenses/styles';
import ExpenseCard from './ExpenseCard';
import { TbArrowBigLeft, TbArrowBigRight } from 'react-icons/tb';
import { FaSackDollar } from 'react-icons/fa6';
import { IoIosWallet } from 'react-icons/io';
import { useContext } from 'react';
import { ExpensesContext } from '../../../context/expensesContext';

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
    <StyledSummaryWrapper gap={'1rem'} justify={'center'}>
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
        text={'Balance'}
        value={balance}
        icon={<IoIosWallet size={30} />}
      />
    </StyledSummaryWrapper>
  );
}
