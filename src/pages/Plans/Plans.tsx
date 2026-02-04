import { useContext, useMemo, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import PlansForm from '../../components/plans/PlansForm/PlansForm';
import { StyledFlexWrapper } from '../../styled/flex';
import PlanItem from '../../components/plans/PlanItem/PlanItem';
import { StyledTable } from '../../styled/table';
import { ExpensesContext } from '../../context/expensesContext';
import { months } from '../../components/TimePeriodSection/TimePeriodSection';

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

  const sortedPlans = useMemo(() => {
    const copiedPlans = plans.slice();
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
  }, [plans]);

  return (
    <StyledFlexWrapper direction="column">
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
