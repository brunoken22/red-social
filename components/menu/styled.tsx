import styled from 'styled-components';

export const DivMenu = styled.div`
  position: absolute;
  right: 0;
  transition: all 5s ease 5s;
`;
export const DivEnlaces = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #535353;
  padding: 1rem;
  border-radius: 10px;
`;

export const Enlaces = styled.div``;
export const Button = styled.button`
  margin: 0;
  background-color: transparent;
  border: 0;
  color: #ddd;
  font-size: 1rem;
  cursor: pointer;
  span:hover {
    color: #db4646;
  }
`;
export const Span = styled.span`
  &:hover {
    color: #fff;
  }
`;
