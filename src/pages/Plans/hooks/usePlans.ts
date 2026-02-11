import { useContext, useMemo, useState } from 'react';
import { ExpensesContext } from '../../../context/expensesContext';
import type { Plan } from '../Plans';
import type { FormDataPlan } from '../../../components/plans/PlansForm/validation';
import { addPlan } from '../../../services/plans/plans';
import { getMonthIndex } from '../../../helpers/helpers';
import { ToastContext } from '../../../context/toastContext';

export const usePlans = () => {
  const [showModal, setShowModal] = useState(false);
  const { plans, setPlans, isPlansLoading } = useContext(ExpensesContext);
  const [filter, setFilter] = useState<string>('current');
  const [isPlanError, setIsPlanError] = useState<string | null>(null);
  const { showToast } = useContext(ToastContext);

  const filteredPlans = useMemo(() => {
    let result: Plan[] = [];
    switch (filter) {
      case 'all':
        result = plans.slice();
        break;
      case 'past':
        result = plans.filter((el) => {
          const monthIndex = getMonthIndex(el.month);
          const dateValue = new Date(el.year, monthIndex, 1);
          return dateValue < new Date() && monthIndex !== new Date().getMonth();
        });
        break;
      case 'current':
        result = plans.filter((el) => {
          const monthIndex = getMonthIndex(el.month);
          return (
            monthIndex === new Date().getMonth() &&
            el.year === new Date().getFullYear()
          );
        });
        break;
      case 'future':
        result = plans.filter((el) => {
          const monthIndex = getMonthIndex(el.month);
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
      const monthIndex = getMonthIndex(el.month);
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
  }, [filteredPlans]);

  const isPlanExists = (data: FormDataPlan) => {
    const existingPlan = plans.find(
      (plan) =>
        plan.category === data.category.value &&
        plan.month === data.month.value &&
        plan.year === +data.year.value
    );
    if (!existingPlan) return false;
    return true;
  };

  const createPlan = async (data: FormDataPlan) => {
    try {
      if (isPlanExists(data)) {
        setIsPlanError('Such plan already exists');
      } else {
        const updatedPlans = await addPlan({
          category: data.category.value,
          cost: data.cost,
          month: data.month.value,
          year: +data.year.value,
        });

        setPlans(updatedPlans);
        setShowModal(false);
      }
    } catch {
      showToast({ type: 'error', message: 'Error occurred during creation' });
    }
  };

  return {
    plans,
    setPlans,
    filter,
    setFilter,
    showModal,
    setShowModal,
    sortedPlans,
    createPlan,
    isPlanError,
    isPlansLoading,
  };
};
