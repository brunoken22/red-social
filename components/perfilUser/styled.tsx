import styled from 'styled-components';

export const DivPerfilUser = styled.div`
  width: 100%;
`;
export const DivHeadPerfil = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #383838;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
export const DivFotoName = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  justify-content: space-evenly;
  @media (max-width: 550px) {
    gap: 0;

    flex-direction: column;
  }
`;
export const DivButton = styled.div`
  @media (max-width: 550px) {
    display: inherit;
    flex-direction: column;
  }
`;
export const DivPublicaciones = styled.div`
  margin: 1rem 30%;
  @media (max-width: 550px) {
    margin: 0;
  }
`;
