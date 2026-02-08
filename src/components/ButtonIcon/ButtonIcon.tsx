import type { ReactNode } from 'react';
import { StyledButtonIcon } from './styles';

export default function ButtonIcon({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return <StyledButtonIcon onClick={onClick}>{children}</StyledButtonIcon>;
}
