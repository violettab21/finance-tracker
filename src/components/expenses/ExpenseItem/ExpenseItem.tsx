import { useEffect, useState } from 'react';
import type { ExpenseData } from '../../../services/expenses/expenses';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { StyledControl } from './styles';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

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

  function transformDate(date: string) {
    const dateObject = new Date(date);
    const transformedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(dateObject);
    return transformedDate;
  }

  return (
    <>
      <tr key={groupedExpense.category}>
        <td>
          <StyledControl
            onClick={() => {
              setIsDetailsVisible(!isDetailsVisible);
            }}
          >
            {isDetailsVisible ? (
              <MdExpandLess size={20} />
            ) : (
              <MdExpandMore size={20} />
            )}
          </StyledControl>
        </td>
        <td>{groupedExpense.category}</td>
        <td>{groupedExpense.cost}</td>
      </tr>
      {isDetailsVisible && (
        <tr>
          <td colSpan={4}>
            <table>
              <tbody>
                {details?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.cost}</td>
                    <td>{transformDate(item.date)}</td>
                    <td>
                      <MdEdit />
                    </td>
                    <td>
                      <MdDelete />
                    </td>
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
