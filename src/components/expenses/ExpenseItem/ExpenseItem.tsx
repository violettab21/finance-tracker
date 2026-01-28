import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  deleteExpense,
  type ExpenseData,
} from '../../../services/expenses/expenses';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import {
  StyledButtonIcon,
  StyledButtonsWrapper,
  StyledControl,
  StyledCost,
  StyledDate,
  StyledDetailsRow,
  StyledDetailsTable,
  StyledNotes,
  StyledRow,
} from './styles';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Modal from '../../Modal/Modal';
import ExpenseFormEdit from '../ExpenseForm/ExpenseFormEdit';

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
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [editItem, setEditItem] = useState<ExpenseData | null>(null);

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
      <StyledRow
        key={groupedExpense.category}
        onClick={() => {
          setIsDetailsVisible(!isDetailsVisible);
        }}
      >
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
      </StyledRow>
      {isDetailsVisible && (
        <tr>
          <td colSpan={3}>
            <StyledDetailsTable>
              <tbody>
                {details?.map((item) => (
                  <>
                    <StyledDetailsRow key={item.id}>
                      <StyledDate>{transformDate(item.date)}</StyledDate>
                      <StyledCost>{item.cost}</StyledCost>
                      <StyledNotes>{item?.notes || 'N/A'}</StyledNotes>
                      <StyledButtonsWrapper>
                        <StyledButtonIcon
                          onClick={() => {
                            setIsEditVisible(true);
                            setEditItem(item);
                          }}
                        >
                          <MdEdit size={20} />
                        </StyledButtonIcon>
                        <StyledButtonIcon
                          onClick={() =>
                            deleteExpense(item.id)
                              .then((result) => {
                                console.log(result);
                                setExpenses(result);
                              })
                              .catch((err) => console.log(err))
                          }
                        >
                          <MdDelete size={20} />
                        </StyledButtonIcon>
                      </StyledButtonsWrapper>
                    </StyledDetailsRow>
                  </>
                ))}
              </tbody>
            </StyledDetailsTable>
          </td>
        </tr>
      )}
      <Modal
        modalContent={
          <ExpenseFormEdit
            setExpenses={setExpenses}
            expense={editItem}
            onClose={() => setIsEditVisible(false)}
          />
        }
        showModal={isEditVisible}
        onClose={() => setIsEditVisible(false)}
      />
    </>
  );
}
