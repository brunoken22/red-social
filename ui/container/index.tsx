import styled from 'styled-components';

export const Main = styled.main`
  background-color: ${({theme}) => theme.contenedor};
  color: ${({theme}) => theme.color};
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  @media (max-width: 550px) {
    grid-template-columns: 100%;
  }
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
  margin: 0 auto;
  margin-bottom: 2rem;
  @media (max-width: 550px) {
    width: auto;
    margin-bottom: 1rem;
  }
`;

export const DivAllPublicaciones = styled(DivPublicar)`
  @media (max-width: 550px) {
    width: auto;
  }
`;
  