import React from 'react';
import { StyledFlexWrapper } from '../../styled/flex';
import ImageBlock from './parts/ImageBlock/ImageBlock';
import { StyledFormWrapper } from './styles';

export default function AuthFormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledFlexWrapper justify="center">
      <StyledFormWrapper
        justify="space-around"
        direction="row"
        align="center"
        width="80%"
        gap={'10px'}
      >
        <ImageBlock />
        {children}
      </StyledFormWrapper>
    </StyledFlexWrapper>
  );
}
