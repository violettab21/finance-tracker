import styled from 'styled-components';

export const StyledModalWrapper = styled.div`
  display: flex;
  background-color: #3a3838b9;
  width: 100%;
  height: 100vh;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
`;

export const StyledModalWindow = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
  padding: 2rem 3rem;
  border-radius: 8px;
`;

export const StyledModalClose = styled.button`
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
