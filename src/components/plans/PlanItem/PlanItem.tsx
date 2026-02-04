import type { Plan } from '../../../pages/Plans/Plans';
import { MdDelete } from 'react-icons/md';
import type { Dispatch, SetStateAction } from 'react';
import { deletePlan } from '../../../services/plans/plans';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { StyledRow } from '../../../styled/table';

export default function PlanItem({
  plan,
  setPlans,
}: {
  plan: Plan;
  setPlans: Dispatch<SetStateAction<Plan[]>>;
}) {
  const onDeletePlan = async (id: string) => {
    try {
      const newPlans = await deletePlan(id);
      setPlans(newPlans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledRow key={plan.category}>
      <td>{plan.category}</td>
      <td>{plan.cost}</td>
      <td>
        {plan.month} {plan.year}
      </td>
      <td>
        <ButtonIcon
          onClick={() => {
            onDeletePlan(plan.id);
          }}
        >
          <MdDelete size={20} />
        </ButtonIcon>
      </td>
    </StyledRow>
  );
}
