import { useExpenses } from '../Expenses/hooks/useExpenses';
import TimePeriodSection from '../../components/TimePeriodSection/TimePeriodSection';
import { StyledFlexWrapper } from '../../styled/flex';
import { getTotalExpenses } from '../../helpers/expenses';
import ExpensesSummary from '../../components/expenses/ExpensesSummary/ExpensesSummary';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { StyledPieWrapper } from './styles';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { BarChart } from '@mui/x-charts/BarChart';

const settings = {
  margin: { left: 50 },
  width: 400,
  height: 400,
};

const chartSetting = {
  yAxis: [
    {
      label: 'Cost',
      width: 60,
    },
  ],
  width: 600,
  height: 400,
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

  const { expensesData } = useContext(ExpensesContext);

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

  const prepareDataBars = (data: ExpenseData[]) => {
    const dataChart = getTotalExpensesPerCategory(data).map((el) => {
      return {
        real: el.cost,
        category: el.category,
      };
    });
    return dataChart;
  };

  return (
    <StyledFlexWrapper direction="column" gap={'1rem'} align="center">
      <StyledFlexWrapper direction="column" gap={'1rem'}>
        <TimePeriodSection
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
        <ExpensesSummary
          expenses={getTotalExpenses(expenses)}
          incomes={getTotalExpenses(incomes)}
          savedFromPreviousMonths={savedFromPreviousMonths}
        />
      </StyledFlexWrapper>
      <StyledPieWrapper direction="column" align="center">
        <p>Month Expenses</p>
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 150,
              data: prepareData(expenses),
              arcLabel: 'label',
              arcLabelMinAngle: 35,
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
                fontSize: 20,
                color: 'black',
              },
            },
          }}
        />
      </StyledPieWrapper>
      <StyledFlexWrapper direction="column" align="center">
        <p>Comparison with planned</p>
        <BarChart
          dataset={prepareDataBars(expenses)}
          xAxis={[{ dataKey: 'category' }]}
          series={[{ dataKey: 'real', label: 'Actual' }]}
          {...chartSetting}
        />
      </StyledFlexWrapper>
      <StyledPieWrapper direction="column" align="center">
        <p>All Expenses</p>
        <PieChart
          series={[
            {
              innerRadius: 50,
              outerRadius: 150,
              data: prepareData(
                expensesData.filter((el) => el.type === 'expense')
              ),
              arcLabel: 'label',
              arcLabelMinAngle: 35,
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
                fontSize: 20,
                color: 'black',
              },
            },
          }}
        />
      </StyledPieWrapper>
    </StyledFlexWrapper>
  );
}
