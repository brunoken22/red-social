import styled from 'styled-components';
export const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  height: 100%;
  font-size: 1.2rem;
  height: 4rem;
  color: #fff;
  border-radius: 5px;
`;
export const BotonForm = styled.button`
  margin-top: 1.5rem;
  width: 150px;
  background: #fff; /* color de fondo */
  color: #5896c9; /* color de fuente */
  border: 2px solid #6aabd6; /* tamaño y color de borde */
  padding: 9px 20px;
  border-radius: 5px; /* redondear bordes */
  position: relative;
  z-index: 1;
  font-size: 1.1rem;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
  &:hover {
    color: #fff; /* color de fuente hover */
  }
  &::after {
    content: '';
    background: #88c4e7; /* color de fondo hover */
    position: absolute;
    z-index: -1;
    padding: 16px 20px;
    display: block;
    left: 0;
    right: 0;
    top: -100%;
    bottom: 100%;
    -webkit-transition: all 0.35s;
    transition: all 0.35s;
  }
  &:hover::after {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    -webkit-transition: all 0.35s;
    transition: all 0.35s;
  }
`;
