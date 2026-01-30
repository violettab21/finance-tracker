import type { ReactNode } from 'react';
import { StyledSummary } from './styles';

interface ExpenseCardProps {
  text: string;
  value: number;
  icon?: ReactNode;
}

export default function ExpenseCard({ text, value, icon }: ExpenseCardProps) {
  return (
    <StyledSummary gap={'1rem'} align={'center'} justify="center">
      {icon}
      <div>
        <p>{text}</p>
        <p>{value}</p>
      </div>
    </StyledSummary>
  );
}
