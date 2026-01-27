import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  deleteExpense,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { StyledControl } from './styles';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

export default function ExpenseItem({
  expenses,
  groupedExpense,
  setExpenses,
}: {
  expenses: ExpenseData[];
  groupedExpense: { category: string; cost: number };
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
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
                      <button>
                        <MdEdit />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          deleteExpense(item.id)
                            .then((result) => {
                              console.log(result);
                              setExpenses(result);
                            })
                            .catch((err) => console.log(err))
                        }
                      >
                        <MdDelete />
                      </button>
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
