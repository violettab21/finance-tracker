import { StyledFlexWrapper } from '../../../../styled/flex';
import { StyledImageBlock, StyledImageText, StyledLink } from './styles';
import { FaArrowRightLong } from 'react-icons/fa6';
export default function ImageBlock() {
  return (
    <StyledFlexWrapper direction="column" width="50%">
      <StyledImageBlock direction="column" justify="space-between">
        <StyledLink to="/">
          Back to main <FaArrowRightLong />
        </StyledLink>
        <StyledImageText>
          Master Your Money, Empower Your Future
        </StyledImageText>
      </StyledImageBlock>
    </StyledFlexWrapper>
  );
}
