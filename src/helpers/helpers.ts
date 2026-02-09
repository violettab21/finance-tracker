import { MONTHS } from '../constants/constants';

export function transformDateForInput(initialDate: string) {
  const dateObject = new Date(initialDate);

  const date = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  return `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
}

export function transformDate(date: string) {
  const dateObject = new Date(date);
  const transformedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObject);
  return transformedDate;
}

export function getMonthName(dateNumber: number) {
  return MONTHS[dateNumber].label;
}
