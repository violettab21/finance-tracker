import { GrNext, GrPrevious } from 'react-icons/gr';
import { type Dispatch, type SetStateAction } from 'react';
import { StyledButtonMonth, StyledTimeWrapper } from './styles';
import { MONTHS } from '../../constants/constants';
import CustomSelect from '../Select/CustomSelect';
import { getMonthIndex } from '../../helpers/helpers';
import { StyledFlexWrapper } from '../../styled/flex';

export default function TimePeriodSection({
  month,
  setMonth,
  year,
  setYear,
}: {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}) {
  const years = generateYears();

  function generateYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 2020; i <= currentYear; i++) {
      years.push(i);
    }
    return years.map((year) => {
      return {
        value: year.toString(),
        label: year.toString(),
      };
    });
  }

  function showNextMonth() {
    const date = new Date(year, month, 1);
    const newDate = date.setMonth(month + 1);
    setMonth(new Date(newDate).getMonth());
    setYear(new Date(newDate).getFullYear());
  }

  function showPrevMonth() {
    const date = new Date(year, month, 1);
    const newDate = date.setMonth(month - 1);
    setMonth(new Date(newDate).getMonth());
    setYear(new Date(newDate).getFullYear());
  }

  return (
    <StyledTimeWrapper direction="row" gap={'1rem'} justify={'center'}>
      <StyledButtonMonth onClick={showPrevMonth}>
        <GrPrevious size={15} />
      </StyledButtonMonth>
      <StyledFlexWrapper width="30%">
        {' '}
        <CustomSelect
          options={MONTHS}
          value={MONTHS[month]}
          onChange={(option: unknown) => {
            if (
              typeof option === 'object' &&
              option &&
              'value' in option &&
              'label' in option
            ) {
              if (option?.value && typeof option?.value === 'string') {
                const monthIndex = getMonthIndex(option.value);
                setMonth(monthIndex);
              }
            }
          }}
        />
      </StyledFlexWrapper>
      <StyledFlexWrapper width="30%">
        <CustomSelect
          options={years}
          value={years.find((yearEl) => yearEl.value === year.toString())}
          onChange={(option: unknown) => {
            if (
              typeof option === 'object' &&
              option &&
              'value' in option &&
              'label' in option
            ) {
              const selectedYear = years.find(
                (yearEl) => yearEl.value === option?.value
              );
              if (selectedYear) {
                setYear(Number(selectedYear.value));
              }
            }
          }}
        />
      </StyledFlexWrapper>

      <StyledButtonMonth onClick={showNextMonth}>
        <GrNext size={15} />
      </StyledButtonMonth>
    </StyledTimeWrapper>
  );
}
