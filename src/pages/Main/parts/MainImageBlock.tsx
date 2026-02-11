import { StyledBlock1, StyledMainBlock } from './styles';
import { StyledFlexWrapper } from '../../../styled/flex';
import Button from '../../../components/Button/Button';

export default function MainImageBlock({
  image,
  header,
  description,
  buttonCallback,
  buttonText,
}: {
  image: string;
  header: string;
  description: string;
  buttonCallback: () => void;
  buttonText: string;
}) {
  return (
    <StyledMainBlock gap={'2rem'} justify="space-between" align="stretch">
      <StyledFlexWrapper
        direction="column"
        justify="space-between"
        gap={'1rem'}
      >
        <StyledFlexWrapper direction="column">
          <h1>{header}</h1>
          <p>{description}</p>
        </StyledFlexWrapper>

        <Button primary onClick={() => buttonCallback()}>
          {buttonText}
        </Button>
      </StyledFlexWrapper>
      <StyledFlexWrapper
        width="50%"
        direction="column"
        justify="center"
        align="center"
      >
        <StyledBlock1 image={image}></StyledBlock1>
      </StyledFlexWrapper>
    </StyledMainBlock>
  );
}
