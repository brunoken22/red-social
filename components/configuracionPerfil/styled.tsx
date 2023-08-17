import styled from 'styled-components';

export const DivConfiguracionPerfil = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  gap: 1rem;
  @media (max-width: 550px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const DIvCongifurar = styled.div`
  max-width: 60%;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  @media (max-width: 550px) {
    text-align: center;
    margin-top: 1.5rem;
    max-width: 100%;
  }
`;
