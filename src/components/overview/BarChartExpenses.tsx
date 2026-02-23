import { BarChart } from '@mui/x-charts/BarChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { getMonthIndex } from '../../helpers/helpers';
import { useTheme } from 'styled-components';

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

export default function BarChartExpenses({
  expenses,
  month,
  year,
}: {
  expenses: ExpenseData[];
  month: number;
  year: number;
}) {
  const { plans } = useContext(ExpensesContext);
  const theme = useTheme();

  const prepareDataBars = (
    data: ExpenseData[],
    month: number,
    year: number
  ) => {
    const dataChart = getTotalExpensesPerCategory(data).map((el) => {
      const planned = plans.find(
        (plan) =>
          plan.category === el.category &&
          getMonthIndex(plan.month) === month &&
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
    <BarChart
      dataset={prepareDataBars(expenses, month, year)}
      xAxis={[
        {
          dataKey: 'category',
        },
      ]}
      series={[
        { dataKey: 'real', label: 'Actual' },
        { dataKey: 'planned', label: 'Planned' },
      ]}
      colors={[
        theme.colors.chartBarsColors.planned,
        theme.colors.chartBarsColors.actual,
      ]}
      slotProps={{
        legend: {
          direction: 'vertical',
          position: {
            vertical: 'middle',
            horizontal: 'end',
          },
          sx: {
            fontSize: 20,
            color: theme.colors.textPrimary,
          },
        },
      }}
      sx={{
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          fill: theme.colors.textPrimary,
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
          fill: theme.colors.textPrimary,
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
          stroke: theme.colors.textPrimary,
          strokeWidth: 2,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
          stroke: theme.colors.textPrimary,
          strokeWidth: 2,
        },
        '.MuiChartsAxis-tick': {
          stroke: theme.colors.textPrimary,
        },
        '.MuiChartsAxis-left .MuiChartsAxis-label': {
          fill: theme.colors.textPrimary,
        },
      }}
      {...chartSetting}
    />
  );
}
