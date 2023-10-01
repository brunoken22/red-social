import styled, {keyframes} from 'styled-components';
const rotate = keyframes`
  from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;
export const ImageLogo = styled.img`
  border-radius: 50%;
  position: absolute;
  height: 25px;
  animation: ${rotate} 1s infinite cubic-bezier(0.4, 0, 1, 1);
`;
export const DivLoader = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  inset: 0 0 0 0;
  backdrop-filter: blur(10px);
  z-index: 10;
`;
