import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { useTheme } from 'styled-components';
import useMediaQuery from '@mui/material/useMediaQuery';

const settings = {
  margin: { left: 10 },
};

export default function PieChartExpenses({
  expenses,
}: {
  expenses: ExpenseData[];
}) {
  const theme = useTheme();
  const smallSize = useMediaQuery('(max-width:600px)');
  const colorsCategory = Object.values(theme.colors.chartPieColors);
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

  function getChartSize() {
    const size = { width: 0, height: 0, innerRadius: 0, outerRadius: 0 };
    if (smallSize) {
      size.width = 150;
      size.height = 150;
      size.innerRadius = 40;
      size.outerRadius = 60;
    } else {
      size.width = 300;
      size.height = 300;
      size.innerRadius = 60;
      size.outerRadius = 100;
    }
    return size;
  }

  return (
    <PieChart
      series={[
        {
          innerRadius: getChartSize().innerRadius,
          outerRadius: getChartSize().outerRadius,
          data: prepareData(expenses),
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: theme.colors.textPrimary,
          fontSize: '20px',
        },
      }}
      {...settings}
      width={getChartSize().width}
      height={getChartSize().height}
      slotProps={{
        legend: {
          direction: smallSize ? 'horizontal' : 'vertical',
          position: {
            vertical: 'middle',
            horizontal: 'center',
          },
          sx: {
            fontSize: 18,
            color: theme.colors.textPrimary,
          },
        },
      }}
    />
  );
}
