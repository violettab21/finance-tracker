import { type Option } from '../components/Select/CustomSelect';

export const FIREBASE_AUTH_ERROR_NETWORK = 'auth/network-request-failed';
export const FIREBASE_AUTH_ERROR_CREDENTIAL = 'auth/invalid-credential';
export const FIREBASE_AUTH_ERROR_EMAIL_IN_USE = 'auth/email-already-in-use';

export const GENERIC_ERROR_TEXT =
  'Something went wrong. Please try again later';

export const DATA_ERROR_TEXT = 'Unable to get data. Please try again later';

export const NETWORK_ERROR_TEXT =
  'Network Error, please check your internet connection and try again';

export const LOG_OUT_SUCCESS_TEXT = 'You are logged out';
export const LOG_OUT_ERROR = 'Unable to log you out. Please try again later';

export const EMAIL_IN_USE_TEXT = 'Email is already in use';
export const INVALID_CREDENTIAL_TEXT = 'Incorrect email or password';

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
