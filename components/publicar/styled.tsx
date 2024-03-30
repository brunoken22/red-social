import styled from 'styled-components';

export const DivText = styled.div`
  display: flex;
  gap: 1rem;
`;
export const DivSubir = styled.div`
  border-top: 1px solid #474747;
  display: flex;
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
  cursor: text;
  margin: 10px auto;
  &::before {
    content: ${({$content}) => ($content ? 'attr(placeholder)' : '')};
    color: #696969;
  }
`;
export const DivCrear = styled.div`
  width: 100%;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #ddd;
    border: 0.5px solid #ddd;
  }
`;
export const DivButton = styled.div`
  margin: 0.5rem 0;
`;

export const ButtonPublicar = styled.button<any>`
  width: 100%;
  padding: 0.5rem;
  background-color: ${({$color}) => ($color ? '#419aff' : '#3e485e')};
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: ${({$color}) => ($color ? 'pointer' : 'not-allowed')};
  &:hover {
    opacity: 0.6;
  }
`;
