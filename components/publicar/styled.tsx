import styled from 'styled-components';

export const DivText = styled.div`
  display: flex;
  gap: 1rem;
`;
export const DivSubir = styled.div`
  border-top: 1px solid #474747;
  display: inherit;
  justify-content: space-around;
`;
export const DivASubir = styled.div`
  display: inherit;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem;
  height: 25px;
  border-radius: 10px;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    backdrop-filter: contrast(0.5);
    overflow: hidden;
  }
`;
export const DivForm = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 10;
  color: #000;
`;
export const Form = styled.form`
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px;
  &:hover {
    border-radius: 50%;
    background-color: #ececec;
  }
`;

export const InputP = styled.p<any>`
  color: #000;
  outline: none;
  width: 100%;
  margin: 10px auto;
  &::before {
    content: ${({content}) => (content ? 'attr(placeholder)' : '')};
    color: #696969;
  }
`;
