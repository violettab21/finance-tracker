import { StyledFlexWrapper } from '../../styled/flex';
import Button from '../Button/Button';
import { StyledText } from './styles';

interface ConfirmationMessageProps {
  confirmCallback: () => void;
  declineCallback: () => void;
  text: string;
}

export default function ConfirmationMessage({
  confirmCallback,
  declineCallback,
  text,
}: ConfirmationMessageProps) {
  return (
    <StyledFlexWrapper direction="column" gap={'1rem'}>
      <StyledText>{text}</StyledText>
      <StyledFlexWrapper gap={'1rem'}>
        <Button secondary onClick={confirmCallback}>
          Yes
        </Button>
        <Button secondary onClick={declineCallback}>
          No
        </Button>
      </StyledFlexWrapper>
    </StyledFlexWrapper>
  );
}
