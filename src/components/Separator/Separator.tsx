import { StyledSeparator, StyledSeparatorWrapper } from './styles';

export default function Separator({ text }: { text: string }) {
  return (
    <StyledSeparatorWrapper>
      {' '}
      <StyledSeparator>
        <div></div>
        <p>{text}</p>
      </StyledSeparator>
    </StyledSeparatorWrapper>
  );
}
