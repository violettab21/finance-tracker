import { StyledSummaryWrapper } from '../../../pages/Expenses/styles';
import ExpenseCard from './ExpenseCard';
import { TbArrowBigLeft, TbArrowBigRight } from 'react-icons/tb';
import { FaSackDollar } from 'react-icons/fa6';
import { IoIosWallet } from 'react-icons/io';

export default function ExpensesSummary({
  expenses,
  incomes,
  saved,
  balance,
}: {
  expenses: number;
  incomes: number;
  saved: number;
  balance: number;
}) {
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
        value={saved}
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
