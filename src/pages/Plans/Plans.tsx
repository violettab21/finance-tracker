import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import PlansForm from '../../components/plans/PlansForm/PlansForm';
import { StyledFlexWrapper } from '../../styled/flex';
import PlanItem from '../../components/plans/PlanItem/PlanItem';
import { StyledTable } from '../../styled/table';
import { usePlans } from './hooks/usePlans';
import Filter from '../../components/plans/Filter/Filter';
import Loader from '../../components/Loader/Loader';
import {
  StyledPlanButton,
  StyledPlanFilter,
  StyledPlansWrapper,
} from './styles';

export interface Plan {
  id: string;
  category: string;
  cost: number;
  month: string;
  year: number;
  date?: Date;
}

export default function Plans() {
  const {
    setPlans,
    filter,
    setFilter,
    showModal,
    setShowModal,
    sortedPlans,
    createPlan,
    isPlanError,
    isPlansLoading,
  } = usePlans();

  return (
    <StyledFlexWrapper direction="column" justify={'center'} align="center">
      <Modal
        modalContent={
          <PlansForm onSubmit={createPlan} isPlanError={isPlanError} />
        }
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
      <StyledPlansWrapper direction="column" width="80%" gap={'1rem'}>
        <StyledFlexWrapper justify="space-between" align="stretch" gap={'1rem'}>
          <StyledPlanButton width="30%">
            <Button onClick={() => setShowModal(true)} secondary>
              Add Plan
            </Button>
          </StyledPlanButton>
          <StyledPlanFilter width="50%">
            <Filter filter={filter} setFilter={setFilter} />
          </StyledPlanFilter>
        </StyledFlexWrapper>
        {isPlansLoading ? (
          <Loader />
        ) : sortedPlans.length > 0 ? (
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
        ) : (
          <p>No plans added</p>
        )}
      </StyledPlansWrapper>
    </StyledFlexWrapper>
  );
}
