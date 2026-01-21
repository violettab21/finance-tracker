import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  secondary?: boolean;
}

export type StyledProps = {
  $primary?: boolean;
  $secondary?: boolean;
};
