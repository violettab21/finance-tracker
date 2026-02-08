import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import {
  getTotalExpensesPerCategory,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { colors } from '../../styled/colors';
const colorsCategory = Object.values(colors.chartPieColors);

const settings = {
  margin: { left: 10 },
  width: 300,
  height: 300,
};

export default function PieChartExpenses({
  expenses,
}: {
  expenses: ExpenseData[];
}) {
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

  return (
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
  );
}
