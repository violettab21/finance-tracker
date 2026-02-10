import { useExpenses } from '../Expenses/hooks/useExpenses';
import TimePeriodSection from '../../components/TimePeriodSection/TimePeriodSection';
import { StyledFlexWrapper } from '../../styled/flex';
import { getTotalExpenses } from '../../helpers/expenses';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';
import { StyledChartWrapper, StyledOverviewWrapper } from './styles';
import PieChartExpenses from '../../components/overview/PieChartExpenses';
import BarChartExpenses from '../../components/overview/BarChartExpenses';
import TopExpenses from '../../components/overview/TopExpenses/TopExpenses';
import { StyledChartTitle } from '../../styled/titles';

export default function Overview() {
  const {
    month,
    setMonth,
    year,
    setYear,
    expenses,
    incomes,
    savedFromPreviousMonths,
  } = useExpenses();

  return (
    <StyledFlexWrapper align="center" direction="column" gap={'1rem'}>
      <StyledFlexWrapper direction="column" gap={'1rem'} align="center">
        <TimePeriodSection
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      </StyledFlexWrapper>
      <StyledOverviewWrapper>
        <StyledFlexWrapper width="35%">
          <StyledFlexWrapper
            direction="column"
            height="100%"
            justify="space-between"
          >
            <ExpensesSummary
              expenses={getTotalExpenses(expenses)}
              incomes={getTotalExpenses(incomes)}
              savedFromPreviousMonths={savedFromPreviousMonths}
            />
          </StyledFlexWrapper>
        </StyledFlexWrapper>
        <StyledChartWrapper direction="column" align="center" width="60%">
          <StyledChartTitle>Total Expanses</StyledChartTitle>
          <BarChartExpenses expenses={expenses} month={month} year={year} />
        </StyledChartWrapper>
        <StyledChartWrapper direction="column" align="center" width="35%">
          <StyledChartTitle>Month Expenses</StyledChartTitle>
          <PieChartExpenses expenses={expenses} />
        </StyledChartWrapper>
        <StyledChartWrapper width="60%" direction="column" align="center">
          <StyledChartTitle>Top 5 Expenses</StyledChartTitle>
          <TopExpenses expenses={expenses} />
        </StyledChartWrapper>
      </StyledOverviewWrapper>
    </StyledFlexWrapper>
  );
}
