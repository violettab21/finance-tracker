import { type ExpenseData } from '../../../services/expenses/expenses';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import {
  StyledButtonsWrapper,
  StyledControl,
  StyledCost,
  StyledDate,
  StyledDetailsRow,
  StyledDetailsTable,
  StyledNotes,
} from './styles';
import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import Modal from '../../Modal/Modal';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import { addCommasToNumber, transformDate } from '../../../helpers/helpers';
import { useExpenseItem } from './hooks/useExpenseItem';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { StyledRow } from '../../../styled/table';
import { useState } from 'react';
import ConfirmationMessage from '../../Confirmation/ConfirmationMessage';
import { CATEGORIES, savingCategories } from '../../../constants/constants';

interface ExpenseItemProps {
  expenses: ExpenseData[];
  groupedExpense: { category: string; cost: number };
}

export default function ExpenseItem({
  expenses,
  groupedExpense,
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
  } = useExpenseItem(expenses, groupedExpense);
  const [isConfirmationMessageVisible, setIsConfirmationMessageVisible] =
    useState(false);
  const [deleteItem, setDeleteItem] = useState<ExpenseData | null>(null);

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
        <td>{addCommasToNumber(groupedExpense.cost)}</td>
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
                      <StyledCost>{addCommasToNumber(item.cost)}</StyledCost>
                      <StyledNotes>{item?.notes || 'N/A'}</StyledNotes>
                      <StyledButtonsWrapper>
                        <ButtonIcon
                          onClick={() => {
                            openEditModal(item);
                          }}
                        >
                          <MdEdit size={20} />
                        </ButtonIcon>
                        <ButtonIcon
                          onClick={() => {
                            setIsConfirmationMessageVisible(true);
                            setDeleteItem(item);
                          }}
                        >
                          <MdDelete size={20} />
                        </ButtonIcon>
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
              editItem?.type === 'income' ? savingCategories : CATEGORIES
            }
          />
        }
        showModal={isEditVisible}
        onClose={() => setIsEditVisible(false)}
      />
      {deleteItem && (
        <Modal
          modalContent={
            <ConfirmationMessage
              confirmCallback={() => {
                onExpenseDelete(deleteItem);
                setIsConfirmationMessageVisible(false);
              }}
              declineCallback={() => setIsConfirmationMessageVisible(false)}
              text={`Are you sure you want to delete selected ${deleteItem.type}: ${deleteItem.category} ${deleteItem.cost}?`}
            />
          }
          showModal={isConfirmationMessageVisible}
          onClose={() => setIsConfirmationMessageVisible(false)}
        />
      )}
    </>
  );
}
