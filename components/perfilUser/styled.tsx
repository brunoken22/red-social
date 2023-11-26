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

  @media (max-width: 550px) {
    gap: 0;

    flex-direction: column;
  }
`;
export const DivFotoNameLink = styled(DivFotoName)`
  justify-content: space-evenly;
`;

export const DivButton = styled.div`
  @media (max-width: 550px) {
    display: flex;
  }
`;
export const DivButtonEliAcep = styled(DivButton)`
  display: flex;
  gap: 1rem;
`;
export const DivPublicaciones = styled.div`
  margin: 1rem auto;
  max-width: 500px;
`;
