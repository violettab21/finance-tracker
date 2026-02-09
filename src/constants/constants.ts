import { type Option } from '../components/Select/CustomSelect';

export const FIREBASE_AUTH_ERROR_NETWORK = 'auth/network-request-failed';
export const FIREBASE_AUTH_ERROR_CREDENTIAL = 'auth/invalid-credential';
export const FIREBASE_AUTH_ERROR_EMAIL_IN_USE = 'auth/email-already-in-use';

export const CATEGORIES: Option[] = [
  { value: 'Home', label: 'Home' },
  { value: 'Food', label: 'Food' },
  { value: 'Cafe', label: 'Cafe' },
  { value: 'Health', label: 'Health' },
  { value: 'Car', label: 'Car' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Taxi', label: 'Taxi' },
  { value: 'Bills', label: 'Bills' },
  { value: 'Car', label: 'Car' },
  { value: 'Network', label: 'Network' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Pets', label: 'Pets' },
  { value: 'Gifts', label: 'Gifts' },
  { value: 'Cloth', label: 'Cloth' },
];

export const savingCategories: Option[] = [
  { value: 'Salary', label: 'Salary' },
  { value: 'Savings', label: 'Savings' },
];

export const PLAN_FILTERS: Option[] = [
  { value: 'all', label: 'All' },
  { value: 'past', label: 'Past Plans' },
  { value: 'current', label: 'Current Plans' },
  { value: 'future', label: 'Future Plans' },
];

export const MONTHS: Option[] = [
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
