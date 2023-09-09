import styled from 'styled-components';
import {InputP} from '../publicar/styled';
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
  margin: 0.1rem;
  height: 300px;
`;
export const DivImageSug = styled(DivImage)<any>`
  background-image: ${({$img}) => ($img ? `url(${$img})` : 'url(/user.webp)')};
  background-position: center;
  background-size: cover;
  padding: 0;
  border-radius: 10px;
  height: 60%;
`;
export const DivCantidad = styled(DivPerfil)`
  gap: 0;
  margin-top: 1rem;
  justify-content: space-around;
`;
export const DivInteractuar = styled(DivPerfil)`
  justify-content: space-around;
  gap: 0;
  border-top: 1px solid #353434;
  padding-top: 0.1rem;
`;

export const BottonLike = styled.button<any>`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  padding: 0px;
  color: #ddd;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0.5rem;
  &:hover {
    background-color: #2d2c2c;
    border-radius: 10px;
    path {
      fill: #5a81ff;
    }
  }
  path {
    fill: ${(prop: any) => (prop.like == 'like' ? '#5a81ff' : '#ddd')};
  }
`;
export const BottonComentar = styled(BottonLike)`
  &:hover {
    path {
      fill: #84e981;
    }
  }
`;
export const DivAñadirComentar = styled.div``;
export const ComentarioParrafo = styled(InputP)``;
