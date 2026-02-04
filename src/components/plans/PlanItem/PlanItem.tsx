import type { Plan } from '../../../pages/Plans/Plans';
import { StyledRow } from '../../expenses/ExpenseItem/styles';

export default function PlanItem({ plan }: { plan: Plan }) {
  return (
    <StyledRow key={plan.category}>
      <td>{plan.category}</td>
      <td>{plan.cost}</td>
      <td>
        {plan.month} {plan.year}
      </td>
    </StyledRow>
  );
}
