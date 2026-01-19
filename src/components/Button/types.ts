export type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
  secondary?: boolean;
};

export type StyledProps = {
  $primary?: boolean;
  $secondary?: boolean;
};
