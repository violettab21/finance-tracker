import { useExpenses } from '../Expenses/hooks/useExpenses';
import TimePeriodSection, {
  months,
} from '../../components/TimePeriodSection/TimePeriodSection';
import { StyledFlexWrapper } from '../../styled/flex';
import { getTotalExpenses } from '../../helpers/expenses';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { StyledChartWrapper, StyledOverviewWrapper } from './styles';
import { useContext, useMemo } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { BarChart } from '@mui/x-charts/BarChart';
import { StyledRow, StyledTableSecondary } from '../../styled/table';

const settings = {
  margin: { left: 10 },
  width: 300,
  height: 300,
};

const chartSetting = {
  yAxis: [
    {
      label: 'Cost',
      width: 60,
    },
  ],
  width: 500,
  height: 300,
};

const colorsCategory = [
  '#8778c7',
  '#3f346d',
  '#222224',
  '#9252a1',
  '#aea4b1',
  '#c425f5',
  '#837e85',
  '#454147',
  '#2e2b72',
  '#5346cc',
  '#e09dfa',
  '#641281',
  '#270933',
];

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

  const { expensesData, plans } = useContext(ExpensesContext);

  const prepareData = (data: ExpenseData[]) => {
    const dataChart = getTotalExpensesPerCategory(data).map((el, i) => {
      const color = colorsCategory[i];
      return {
        label: el.category,
        value: el.cost,
        color,
      };
    });
    return dataChart;
  };

  const topExpenses = useMemo(() => {
    const groupedExpensesByCategory = getTotalExpensesPerCategory(expenses);
    const copy = [...groupedExpensesByCategory];
    const topFiveExpenses = copy.sort((a, b) => b.cost - a.cost).slice(0, 5);
    return topFiveExpenses;
  }, [expensesData, month, year, expenses]);

  const prepareDataBars = (data: ExpenseData[]) => {
    const dataChart = getTotalExpensesPerCategory(data).map((el) => {
      const planned = plans.find(
        (plan) =>
          plan.category === el.category &&
          months.findIndex((object) => object.value === plan.month) === month &&
          plan.year === year
      );
      return {
        real: el.cost,
        planned: planned?.cost || 0,
        category: el.category,
      };
    });
    return dataChart;
  };

  return (
    <StyledFlexWrapper align="center" direction="column" gap={'1rem'}>
      <StyledFlexWrapper direction="column" gap={'1rem'}>
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
          <p>Total Expanses</p>
          <BarChart
            dataset={prepareDataBars(expenses)}
            xAxis={[
              {
                dataKey: 'category',
              },
            ]}
            series={[
              { dataKey: 'real', label: 'Actual' },
              { dataKey: 'planned', label: 'Planned' },
            ]}
            colors={[colorsCategory[0], colorsCategory[1]]}
            slotProps={{
              legend: {
                direction: 'vertical',
                position: {
                  vertical: 'middle',
                  horizontal: 'end',
                },
                sx: {
                  fontSize: 20,
                  color: 'white',
                },
              },
            }}
            sx={{
              '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
                fill: '#e4d9d9',
              },
              '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                fill: '#e4d9d9',
              },
              '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                stroke: '#e4d9d9',
                strokeWidth: 2,
              },
              '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                stroke: '#e4d9d9',
                strokeWidth: 2,
              },
              '.MuiChartsAxis-tick': {
                stroke: '#e4d9d9',
              },
              '.MuiChartsAxis-left .MuiChartsAxis-label': { fill: '#e4d9d9' },
            }}
            {...chartSetting}
          />
        </StyledChartWrapper>
        <StyledChartWrapper direction="column" align="center" width="35%">
          <p>Month Expenses</p>
          <PieChart
            series={[
              {
                innerRadius: 60,
                outerRadius: 100,
                data: prepareData(expenses),
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: 'white',
                fontSize: '20px',
              },
            }}
            {...settings}
            slotProps={{
              legend: {
                direction: 'vertical',
                position: {
                  vertical: 'middle',
                  horizontal: 'start',
                },
                sx: {
                  fontSize: 18,
                  color: 'white',
                },
              },
            }}
          />
        </StyledChartWrapper>
        <StyledChartWrapper width="60%" direction="column" align="center">
          <p>Top 5 Expenses</p>
          <StyledTableSecondary>
            <thead>
              <tr>
                <th>Category</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {topExpenses.map((expense) => (
                <StyledRow key={expense.category}>
                  <td>{expense.category}</td>
                  <td>{expense.cost}</td>
                </StyledRow>
              ))}
            </tbody>
          </StyledTableSecondary>
        </StyledChartWrapper>
      </StyledOverviewWrapper>
    </StyledFlexWrapper>
  );
}
