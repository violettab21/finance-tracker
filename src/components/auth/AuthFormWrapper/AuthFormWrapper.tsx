import React from 'react';
import ImageBlock from './parts/ImageBlock/ImageBlock';
import {
  StyledBlockWrapper,
  StyledFormWrapper,
  StyledImageWrapper,
} from './styles';
import { StyledFlexWrapper } from '../../../styled/flex';

export default function AuthFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledFlexWrapper justify="center" align="center">
      <StyledBlockWrapper
        justify="space-around"
        direction="row"
        align="center"
        width="80%"
        gap={'10px'}
      >
        <StyledImageWrapper direction="column" width="50%">
          <ImageBlock />
        </StyledImageWrapper>
        <StyledFormWrapper width="50%" justify="center">
          {children}
        </StyledFormWrapper>
      </StyledBlockWrapper>
    </StyledFlexWrapper>
  );
}
