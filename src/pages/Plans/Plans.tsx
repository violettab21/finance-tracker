import { useContext, useMemo, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import PlansForm from '../../components/plans/PlansForm/PlansForm';
import { StyledFlexWrapper } from '../../styled/flex';
import PlanItem from '../../components/plans/PlanItem/PlanItem';
import { StyledTable } from '../../styled/table';
import { ExpensesContext } from '../../context/expensesContext';
import { months } from '../../components/TimePeriodSection/TimePeriodSection';
import { customStyles } from '../../components/expenses/ExpenseForm/styles';
import { StyledSelect } from './styles';

const plansFilters = [
  { value: 'all', label: 'All' },
  { value: 'past', label: 'Past Plans' },
  { value: 'current', label: 'Current Plans' },
  { value: 'future', label: 'Future Plans' },
];

export interface Plan {
  id: string;
  category: string;
  cost: number;
  month: string;
  year: number;
  date?: Date;
}

export default function Plans() {
  const [showModal, setShowModal] = useState(false);
  const { plans, setPlans } = useContext(ExpensesContext);
  const [filter, setFilter] = useState<string>('current');

  const filteredPlans = useMemo(() => {
    let result: Plan[] = [];
    switch (filter) {
      case 'all':
        result = plans.slice();
        break;
      case 'past':
        result = plans.filter((el) => {
          const monthIndex = months.findIndex(
            (value) => value.value === el.month
          );
          const dateValue = new Date(el.year, monthIndex, 1);
          return dateValue < new Date() && monthIndex !== new Date().getMonth();
        });
        break;
      case 'current':
        result = plans.filter((el) => {
          const monthIndex = months.findIndex(
            (value) => value.value === el.month
          );
          return (
            monthIndex === new Date().getMonth() &&
            el.year === new Date().getFullYear()
          );
        });
        break;
      case 'future':
        result = plans.filter((el) => {
          const monthIndex = months.findIndex(
            (value) => value.value === el.month
          );
          const dateValue = new Date(el.year, monthIndex, 1);
          return dateValue > new Date();
        });
        break;
    }
    return result;
  }, [plans, filter]);

  const sortedPlans = useMemo(() => {
    const copiedPlans = filteredPlans.slice();
    const formattedPlans = copiedPlans.map((el) => {
      const monthIndex = months.findIndex((value) => value.value === el.month);
      const dateValue = new Date(el.year, monthIndex, 1);
      return {
        id: el.id,
        category: el.category,
        cost: el.cost,
        month: el.month,
        year: el.year,
        date: dateValue,
      };
    });
    return formattedPlans.sort((a, b) => Number(a.date) - Number(b.date));
  }, [filteredPlans, filter, plans]);

  return (
    <StyledFlexWrapper direction="column">
      <StyledFlexWrapper justify="flex-end">
        <StyledSelect
          options={plansFilters}
          styles={customStyles}
          value={plansFilters.find((el) => el.value === filter)}
          onChange={(option: unknown) => {
            if (
              typeof option === 'object' &&
              option &&
              'value' in option &&
              'label' in option
            ) {
              if (typeof option.value === 'string') {
                setFilter(option.value);
              }
            }
          }}
        ></StyledSelect>
      </StyledFlexWrapper>

      <Button onClick={() => setShowModal(true)}>Add Plan</Button>
      <Modal
        modalContent={<PlansForm />}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <StyledFlexWrapper width="100%">
        <StyledTable>
          <thead>
            <tr>
              <th>Category</th>
              <th>Cost</th>
              <th>Time Period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedPlans.map((plan) => (
              <PlanItem key={plan.id} plan={plan} setPlans={setPlans} />
            ))}
          </tbody>
        </StyledTable>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
