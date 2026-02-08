import type { Dispatch, SetStateAction } from 'react';
import { PLAN_FILTERS } from '../../../constants/constants';
import CustomSelect from '../../Select/CustomSelect';

export default function Filter({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <CustomSelect
      options={PLAN_FILTERS}
      value={PLAN_FILTERS.find((el) => el.value === filter)}
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
    />
  );
}
