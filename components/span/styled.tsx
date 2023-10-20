import styled from 'styled-components';

export const DivSpan = styled.div`
  min-width: 250px;
  max-width: 20%;
  margin-left: 5rem;
  text-align: center;
  position: relative;
  height: 5%;
  @media (max-width: 800px) {
    display: none;
  }
`;
export const DivSvg = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
