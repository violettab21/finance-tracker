import { useEffect, useState } from 'react';
import type { ExpenseData } from '../../../services/expenses/expenses';

export default function ExpenseItem({
  expenses,
  groupedExpense,
}: {
  expenses: ExpenseData[];
  groupedExpense: { category: string; cost: number };
}) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [details, setDetails] = useState<ExpenseData[]>();

  useEffect(() => {
    const getCategoryDetails = () => {
      const data = expenses.filter((expenseData) => {
        return expenseData.category === groupedExpense.category;
      });
      setDetails(data);
    };
    getCategoryDetails();
  }, [expenses, groupedExpense.category]);

  return (
    <>
      <tr key={groupedExpense.category}>
        <td>
          <button
            onClick={() => {
              setIsDetailsVisible(!isDetailsVisible);
            }}
          >
            {!isDetailsVisible ? 'Expand' : 'Collapse'}
          </button>
        </td>
        <td>{groupedExpense.category}</td>
        <td>{groupedExpense.cost}</td>
      </tr>
      {isDetailsVisible && (
        <tr>
          <td colSpan={3}>
            <table>
              <tbody>
                {details?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.cost}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
}
