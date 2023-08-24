'use client';
import styled from 'styled-components';
export const Main = styled.main`
  background-color: ${({theme}) => theme.contenedor};
  color: ${({theme}: any) => theme.color};
  padding: 5rem 1rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  height: 100%;
`;

export const DivMain = styled(Main)`
  flex-direction: column;
  align-items: center;
  padding: 0;
  padding: 5rem 1rem;
`;
export const DivButton = styled.div`
  background-color: #242936;
  border-radius: 5px;
`;
export const ContainerMain = styled.div`
  display: inherit;
  justify-content: center;
  width: 100%;
  gap: 1.5rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const DivPublicaciones = styled.div`
  min-width: 100px;
  max-width: 600px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const DivPublicar = styled.div`
  background-color: ${({theme}) => theme.bg};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  border: 1px solid #3b3b3b;
  margin-bottom: 2rem;
  @media (max-width: 550px) {
    width: auto;
    margin-bottom: 1rem;
  }
`;
export const DivAllChat = styled(DivPublicar)`
  flex-direction: row;
  margin: 0;
  align-items: center;
  @media (max-width: 550px) {
    width: auto;
  }
`;
export const DivAllAmistades = styled(DivPublicar)`
  width: 185px;
  height: 300px;
  padding: 0;
  text-align: center;
  display: block;
  @media (max-width: 550px) {
    width: 160px;
  }
`;
export const DivAllPublicaciones = styled(DivPublicar)`
  @media (max-width: 550px) {
    width: auto;
    padding: 10px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  width: 90%;
  padding: 1rem;
`;
