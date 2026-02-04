import { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import PlansForm from '../../components/plans/PlansForm/PlansForm';
import { StyledFlexWrapper } from '../../styled/flex';
import PlanItem from '../../components/plans/PlanItem/PlanItem';
import { StyledTable } from '../../styled/table';
import { ExpensesContext } from '../../context/expensesContext';

export interface Plan {
  id: string;
  category: string;
  cost: number;
  month: string;
  year: number;
}

export default function Plans() {
  const [showModal, setShowModal] = useState(false);
  const { plans, setPlans } = useContext(ExpensesContext);

  return (
    <StyledFlexWrapper direction="column">
      <Button onClick={() => setShowModal(true)}>Add Plan</Button>
      <Modal
        modalContent={<PlansForm setPlans={setPlans} />}
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
            {plans.map((plan) => (
              <PlanItem key={plan.id} plan={plan} setPlans={setPlans} />
            ))}
          </tbody>
        </StyledTable>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
