import { BarChart } from '@mui/x-charts/BarChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { colors } from '../../styled/colors';
import { getMonthIndex } from '../../helpers/helpers';

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
      colors={[colors.chartBarsColors.planned, colors.chartBarsColors.actual]}
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
          fill: colors.textLight,
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
          fill: colors.textLight,
        },
        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
          stroke: colors.textLight,
          strokeWidth: 2,
        },
        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
          stroke: colors.textLight,
          strokeWidth: 2,
        },
        '.MuiChartsAxis-tick': {
          stroke: colors.textLight,
        },
        '.MuiChartsAxis-left .MuiChartsAxis-label': { fill: colors.textLight },
      }}
      {...chartSetting}
    />
  );
}
