import styled from 'styled-components';
import {DivImage} from '../publicaciones/styled';

export const Section = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
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
export const DivIcons = styled.div`
  font-size: 1rem;
  display: flex;
  color: #959595;
`;
export const DivResult = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  margin-top: 0;
  @media (max-width: 600px) {
    margin-top: 1.5rem;
  }
`;

export const DivImageSug = styled(DivImage)<any>`
  background-image: ${({$img}) => ($img ? `url(${$img})` : 'url(/user.webp)')};
  background-position: center;
  background-size: cover;
  padding: 0;
  border-radius: 10px;
  height: 60%;
`;
