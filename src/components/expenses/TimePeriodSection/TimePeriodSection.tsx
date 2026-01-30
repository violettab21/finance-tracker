import { StyledFlexWrapper } from '../../../styled/flex';
import { StyledButtonMonth } from '../../../pages/Expenses/styles';
import type { Dispatch, SetStateAction } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { customStyles } from '../ExpenseForm/styles';
import Select from 'react-select';

export default function TimePeriodSection({
  year,
  month,
  setYear,
  setMonth,
}: {
  year: number;
  month: number;
  setYear: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}) {
  const months = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },
  ];
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
    <StyledFlexWrapper
      direction="row"
      gap={'1rem'}
      align="center"
      justify={'center'}
    >
      <StyledButtonMonth onClick={showPrevMonth}>
        <GrPrevious size={15} />
      </StyledButtonMonth>
      <Select
        options={months}
        styles={customStyles}
        value={months[month]}
        onChange={(option: unknown) => {
          if (
            typeof option === 'object' &&
            option &&
            'value' in option &&
            'label' in option
          ) {
            const monthIndex = months.findIndex(
              (object) => object.value === option?.value
            );
            setMonth(monthIndex);
          }
        }}
      ></Select>
      <Select
        options={years}
        styles={customStyles}
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
      ></Select>
      <StyledButtonMonth onClick={showNextMonth}>
        <GrNext size={15} />
      </StyledButtonMonth>
    </StyledFlexWrapper>
  );
}
