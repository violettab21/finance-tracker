import styled from 'styled-components';

type FlexProps = {
  direction?: 'row' | 'column';
  justify?: 'center' | 'flex-start' | 'flex-end';
  align?: 'center' | 'flex-start' | 'flex-end';
  width?: string;
  gap?: string;
};

export const StyledFlexWrapper = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  gap: ${(props) => props.gap || '0px'};
`;
