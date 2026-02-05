import type { Plan } from '../../../pages/Plans/Plans';
import { MdDelete } from 'react-icons/md';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { deletePlan } from '../../../services/plans/plans';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { StyledRow } from '../../../styled/table';
import Modal from '../../Modal/Modal';
import ConfirmationMessage from '../../Confirmation/ConfirmationMessage';

export default function PlanItem({
  plan,
  setPlans,
}: {
  plan: Plan;
  setPlans: Dispatch<SetStateAction<Plan[]>>;
}) {
  const [isConfirmationMessageVisible, setIsConfirmationMessageVisible] =
    useState(false);

  const onDeletePlan = async (id: string) => {
    try {
      const newPlans = await deletePlan(id);
      setPlans(newPlans);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledRow key={plan.category}>
        <td>{plan.category}</td>
        <td>{plan.cost}</td>
        <td>
          {plan.month} {plan.year}
        </td>
        <td>
          <ButtonIcon
            onClick={() => {
              {
                setIsConfirmationMessageVisible(true);
              }
            }}
          >
            <MdDelete size={20} />
          </ButtonIcon>
        </td>
      </StyledRow>
      <Modal
        modalContent={
          <ConfirmationMessage
            confirmCallback={() => {
              onDeletePlan(plan.id);
              setIsConfirmationMessageVisible(false);
            }}
            declineCallback={() => {
              setIsConfirmationMessageVisible(false);
            }}
            text="test"
          />
        }
        onClose={() => setIsConfirmationMessageVisible(false)}
        showModal={isConfirmationMessageVisible}
      />
    </>
  );
}
