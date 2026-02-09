import { useContext, useMemo } from 'react';
import { getTotalSavingPerDate } from '../../services/expenses/expenses';
import { StyledFlexWrapper } from '../../styled/flex';
import { StyledRow, StyledTableSecondary } from '../../styled/table';
import { ExpensesContext } from '../../context/expensesContext';
import ExpenseCard from '../../components/expenses/ExpensesSummary/ExpenseCard';

import { IoIosWallet } from 'react-icons/io';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { StyledSavedTableWrapper, StyledSavingSummary } from './styles';

export default function Savings() {
  const { expensesData } = useContext(ExpensesContext);

  const savedPerMonths = useMemo(() => {
    return getTotalSavingPerDate(expensesData);
  }, [expensesData]);

  const totalSaved = useMemo(() => {
    return savedPerMonths.reduce((prev, current) => current.saved + prev, 0);
  }, [savedPerMonths]);

  const average = useMemo(() => {
    if (savedPerMonths.length > 0) {
      return Math.round(totalSaved / savedPerMonths.length);
    } else {
      return 0;
    }
  }, [savedPerMonths, totalSaved]);

  return (
    <StyledFlexWrapper width="100%" direction="column" gap={'1rem'}>
      <StyledSavingSummary justify="center">
        <ExpenseCard
          text={'You total saved'}
          value={totalSaved}
          icon={<IoIosWallet />}
        />
        <ExpenseCard
          text={'Month average'}
          value={average}
          icon={<FaMoneyBillTrendUp />}
        />
      </StyledSavingSummary>
      <StyledSavedTableWrapper direction="column">
        <p>Check how much money you saved per month:</p>
        <StyledTableSecondary>
          <thead>
            <tr>
              <th>Saved</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {savedPerMonths.map((saving) => (
              <StyledRow key={saving.month + saving.year}>
                <td>{saving.saved}</td>
                <td>
                  {saving.month} {saving.year}
                </td>
              </StyledRow>
            ))}
          </tbody>
        </StyledTableSecondary>
      </StyledSavedTableWrapper>
    </StyledFlexWrapper>
  );
}
