import { useEffect, useState } from 'react';
import { type Option } from '../../components/Select/CustomSelect';
import {
  addExpense,
  getExpensesByUser,
  type ExpenseData,
} from '../../services/expenses/expenses';
import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import ExpenseForm from '../../components/expenses/ExpenseForm/ExpenseForm';
import type { FormDataExpense } from '../../components/expenses/ExpenseForm/validation';
import { StyledTable } from '../../styled/table';

export const savingCategories: Option[] = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Savings', label: 'Savings' },
];

export default function Savings() {
  const [showModal, setShowModal] = useState(false);
  const [savings, setSavings] = useState<ExpenseData[]>([]);

  const onSavingCreate = async (data: FormDataExpense) => {
    console.log(data);
    try {
      await addExpense({
        category: data.category.value,
        type: 'income',
        cost: data.cost,
        date: data.date,
        notes: data.notes,
      });
      const userIncomes = await getExpensesByUser('income');

      setSavings(userIncomes);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExpensesByUser('income')
      .then((result) =>
        setSavings(result.filter((el) => el.category === 'Savings'))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledFlexWrapper width="100%" direction="column">
      <Button primary onClick={() => setShowModal(true)}>
        Add Saving
      </Button>
      <Modal
        modalContent={
          <ExpenseForm
            title="Add Saving"
            onSubmit={onSavingCreate}
            categories={savingCategories.filter((el) => el.value === 'Savings')}
            editedExpense={null}
          />
        }
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <StyledFlexWrapper width={'100%'}>
        {' '}
        <StyledTable>
          <thead>
            <tr>
              <td>Cost</td>
              <td>Date</td>
              <td>Notes</td>
            </tr>
          </thead>
          <tbody>
            {savings.map((saving) => (
              <tr key={saving.id}>
                <td>{saving.cost}</td>
                <td>{saving.date}</td>
                <td>{saving.notes ? saving.notes : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
