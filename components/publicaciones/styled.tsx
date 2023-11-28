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

export const DivCantidad = styled(DivPerfil)`
  display: grid;
  gap: 0;
  margin-top: 1rem;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
  position: relative;
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
    fill: ${(prop: any) => (prop.$like == 'like' ? '#5a81ff' : '#ddd')};
  }
`;
export const BottonComentar = styled(BottonLike)`
  &:hover {
    path {
      fill: #84e981;
    }
  }
`;
export const BottonSendComentario = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  svg:hover {
    fill: #2684ff;
  }
`;
export const DivAñadirComentar = styled.div`
  border-radius: 10px;
  width: 100%;
  border: 1px solid #fff;
  padding: 0.3rem;
  display: grid;
  align-items: center;
  font-size: 0.9rem;
  grid-template-columns: repeat(1, 90% 10%);
  &:focus {
    border: 2px solid red;
  }
`;
export const ComentarioParrafo = styled(InputP)`
  text-indent: 10px;
  color: #ddd;
  margin: 0;
`;

export const DivPefilDelete = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonOpenDelete = styled.button`
  display: flex;
  gap: 0.2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover span {
    background-color: #fff;
  }
`;
export const ContentDelete = styled.span`
  height: 7px;
  width: 7px;
  background-color: #b4b4b4;
  border-radius: 50%;
`;

export const ButtonDelete = styled.button`
  position: absolute;
  background-color: #cac9c9;
  color: #313131;
  border: none;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  right: 0;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
export const ButtonMasPubli = styled.button`
  border: none;
  background-color: transparent;
  color: #9d9d9d;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;
export const DivUserLikes = styled.div`
  position: absolute;
  bottom: 2rem;
  background-color: #fff;
  padding: 1rem;
  left: 10%;
  font-size: 0.8rem;
  font-weight: 900;
  color: var(--colorSecundario);
`;
