import styled from 'styled-components';

export const DivPerfil = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export const DivSpan = styled.span`
  font-size: 0.7rem;
  display: block;
  color: #b5b5b5;
`;
export const SpanIco = styled(DivSpan)`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 0.2rem;
`;
export const DivImage = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 1rem;
  height: 300px;
`;
export const DivImageSug = styled(DivImage)`
  background-image: url(./portafolio.png);
  background-position: center;
  background-size: cover;
  padding: 0;
  border-radius: 10px;
  height: 60%;
`;
export const DivCantidad = styled(DivPerfil)`
  gap: 0;
  justify-content: space-around;
`;
export const DivInteractuar = styled(DivPerfil)`
  justify-content: space-around;
  gap: 0;
  border-top: 1px solid #353434;
  padding-top: 1rem;
`;
export const BottonLike = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0px;

  path:hover {
    fill: #5a81ff;
  }
`;
export const BottonComentar = styled(BottonLike)`
  path:hover {
    fill: #84e981;
  }
`;
