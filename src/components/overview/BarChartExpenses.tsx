import { BarChart } from '@mui/x-charts/BarChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { useContext } from 'react';
import { ExpensesContext } from '../../context/expensesContext';
import { getMonthIndex } from '../../helpers/helpers';
import { useTheme } from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

const chartSetting = {
  yAxis: [
    {
      label: 'Cost',
      width: 60,
    },
  ],
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
  const smallSize = useMediaQuery('(max-width:600px)');

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

  function getChartSize() {
    const size = { width: 0, height: 0 };
    if (smallSize) {
      size.width = 360;
      size.height = 300;
    } else {
      size.width = 500;
      size.height = 300;
    }
    return size;
  }

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
          direction: 'horizontal',
          position: {
            vertical: 'bottom',
            horizontal: 'center',
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
      width={getChartSize().width}
      height={getChartSize().height}
    />
  );
}
