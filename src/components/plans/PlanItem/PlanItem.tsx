import type { Plan } from '../../../pages/Plans/Plans';
import { MdDelete } from 'react-icons/md';
import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { deletePlan } from '../../../services/plans/plans';
import ButtonIcon from '../../ButtonIcon/ButtonIcon';
import { StyledRow } from '../../../styled/table';
import Modal from '../../Modal/Modal';
import ConfirmationMessage from '../../Confirmation/ConfirmationMessage';
import { addCommasToNumber } from '../../../helpers/helpers';
import { ToastContext } from '../../../context/toastContext';

export default function PlanItem({
  plan,
  setPlans,
}: {
  plan: Plan;
  setPlans: Dispatch<SetStateAction<Plan[]>>;
}) {
  const [isConfirmationMessageVisible, setIsConfirmationMessageVisible] =
    useState(false);
  const { showToast } = useContext(ToastContext);

  const onDeletePlan = async (id: string) => {
    try {
      const newPlans = await deletePlan(id);
      setPlans(newPlans);
    } catch {
      showToast({ type: 'error', message: 'Error occurred during delete' });
    }
  };

  return (
    <>
      <StyledRow key={plan.category}>
        <td>{plan.category}</td>
        <td>{addCommasToNumber(plan.cost)}</td>
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
            text="Are you sure you want to delete selected plan?"
          />
        }
        onClose={() => setIsConfirmationMessageVisible(false)}
        showModal={isConfirmationMessageVisible}
      />
    </>
  );
}
