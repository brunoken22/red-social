import styled, {keyframes} from 'styled-components';
const animationSkeleton = keyframes`
    100%{
        background-color: #ffffff;
        right: 0%;
        -webkit-filter: blur(1px);
        box-shadow: 0 0 50px 10px, 0 0 50px 10px;
    }
    0%{
      -webkit-filter: blur(1px);
        right: 100%;
    }
`;
type TypeTextSkeleton = {
  $width?: string;
  $height?: string;
  $margin?: string;
};
export const DivSkeleton = styled.div`
  width: 100%;
`;
export const PhotoSkeleton = styled.div<TypeTextSkeleton>`
  width: ${(props: TypeTextSkeleton) => props.$width || '80px'};
  height: ${(props: TypeTextSkeleton) => props.$height || '80px'};
  border-radius: 50%;
  background-color: #858585;
  position: relative;
  overflow: auto;

  span {
    animation: ${animationSkeleton} 1s linear infinite;
  }
`;
export const TextSkeleton = styled.div<TypeTextSkeleton>`
  width: ${(props: TypeTextSkeleton) => props.$width || '120px'};
  height: ${(props: TypeTextSkeleton) => props.$height || '30px'};
  margin: ${(props: TypeTextSkeleton) => props.$margin || '0'};
  background-color: #858585;
  position: relative;
  overflow: auto;
  span {
    animation: ${animationSkeleton} 1s linear infinite;
  }
  @media (max-width: 550px) {
    // margin: 1rem;
  }
`;
export const TemplePubliSkeleton = styled.div<TypeTextSkeleton>`
  width: ${(props: TypeTextSkeleton) => props.$width || '500px'};
  height: ${(props: TypeTextSkeleton) => props.$height || '30px'};
  margin: ${(props: TypeTextSkeleton) => props.$margin || '0'};
  background-color: #474747;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 550px) {
    width: auto;
    margin: 2rem auto;
  }
`;
export const SpanLuz = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
`;
