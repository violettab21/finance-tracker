import { type Dispatch, type SetStateAction } from 'react';
import { type ExpenseData } from '../../../services/expenses/expenses';
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
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { categories } from '../../Select/CustomSelect';
import { savingCategories } from '../../../pages/Savings/Savings';
import { transformDate } from '../../../helpers/helpers';
import { useExpenseItem } from './hooks/useExpenseItem';

interface ExpenseItemProps {
  expenses: ExpenseData[];
  groupedExpense: { category: string; cost: number };
  setExpenses: Dispatch<SetStateAction<ExpenseData[]>>;
}

export default function ExpenseItem({
  expenses,
  groupedExpense,
  setExpenses,
}: ExpenseItemProps) {
  const {
    onExpenseUpdate,
    onExpenseDelete,
    openEditModal,
    toggleDetailsVisibility,
    isDetailsVisible,
    details,
    isEditVisible,
    editItem,
    setIsEditVisible,
  } = useExpenseItem(expenses, groupedExpense, setExpenses);

  return (
    <>
      <StyledRow
        key={groupedExpense.category}
        onClick={toggleDetailsVisibility}
      >
        <td>
          <StyledControl onClick={toggleDetailsVisibility}>
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
                            openEditModal(item);
                          }}
                        >
                          <MdEdit size={20} />
                        </StyledButtonIcon>
                        <StyledButtonIcon onClick={() => onExpenseDelete(item)}>
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
          <ExpenseForm
            editedExpense={editItem}
            onSubmit={onExpenseUpdate}
            title={'Edit expense'}
            categories={
              editItem?.type === 'income' ? savingCategories : categories
            }
          />
        }
        showModal={isEditVisible}
        onClose={() => setIsEditVisible(false)}
      />
    </>
  );
}
