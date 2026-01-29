import type { ReactNode } from 'react';
import { StyledSummary } from './styles';

export default function ExpenseCard({
  text,
  value,
  icon,
}: {
  text: string;
  value: number;
  icon?: ReactNode;
}) {
  return (
    <StyledSummary gap={'1rem'} align={'center'} justify="center">
      {icon}
      <div>
        {' '}
        <p>{text}</p>
        <p>{value}</p>
      </div>
    </StyledSummary>
  );
}
