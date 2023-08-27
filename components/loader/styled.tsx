import styled from 'styled-components';

export const DivLoader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0 0 0 0;
  backdrop-filter: blur(10px);
  z-index: 10;
`;
