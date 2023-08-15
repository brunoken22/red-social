import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
`;
export const DivSection = styled.div`
  max-width: 800px;
`;
export const DivResponse = styled(DivSection)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
export const Seccion = styled.div``;
export const DivIcons = styled.div`
  font-size: 1rem;
  display: flex;
  color: #959595;
`;
export const DivResult = styled.div`
  max-width: 800px;
  width: 100%;
  @media (max-width: 1280px) {
    margin-top: 1.5rem;
    text-align: center;
  }
`;
