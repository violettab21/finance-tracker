import styled from 'styled-components';

export const StyledSeparator = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding: 0.5rem 0;
  div {
    border-top: white solid 1px;
    width: 100%;
    position: relative;
    top: 50%;
  }
  p {
    position: absolute;
    top: -10px;
    left: calc(50% - 50px);
    background-color: ${(props) => props.theme.colors.backgroundSection};
    padding: 0.5rem;
  }
`;
export const StyledSeparatorWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 0;
`;
