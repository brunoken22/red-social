import styled from 'styled-components';

export const DivFooter = styled.div`
  background-color: var(--bg);
  color: #fff;
  text-align: center;
  padding: 2rem;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  @media (max-width: 550px) {
    position: relative;
  }
`;
