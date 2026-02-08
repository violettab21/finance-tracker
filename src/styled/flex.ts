import styled from 'styled-components';

type FlexProps = {
  direction?: 'row' | 'column';
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  align?: 'center' | 'flex-start' | 'flex-end' | 'space-around' | 'stretch';
  width?: string;
  gap?: string;
  height?: string;
};

export const StyledFlexWrapper = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'flex-start'};
  width: ${(props) => props.width || '100%'};
  gap: ${(props) => props.gap || '0px'};
  height: ${(props) => props.height};
`;
