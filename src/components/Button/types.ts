export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
};

export type StyledButtonType = Omit<ButtonProps, 'children' | 'onClick'>;
