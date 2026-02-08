import styled from 'styled-components';

export const StyledLeftNavBar = styled.div`
  background-color: #3d3d4f;
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    list-style-type: none;
  }

  li {
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease-out;
  }

  li:hover {
    background-color: #7979884d;
    border-radius: 8px;
  }
`;
