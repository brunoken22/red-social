import styled from 'styled-components';

export const DivTemMensaje = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  gap: 1rem;
  flex-wrap: wrap;
`;
export const TemplMensaje = styled.div`
  display: inherit;
  gap: 1rem;
  flex-direction: column;
`;

export const TemplChat = styled.div`
  display: inherit;
  gap: 1rem;
  flex-direction: column;
`;

export const TemplSns = styled.div`
  display: inherit;
  gap: 1rem;
  flex-direction: column;
  max-width: 800px;
  width: 90%;
  border: 1px solid #3b3b3b;
  padding: 1rem;
  border-radius: 10px;
`;
export const Sms = styled.div`
  display: inherit;
  height: 600px;
  background-color: #232323;
  overflow-y: auto;
  padding: 1rem;
  flex-direction: column;
`;
export const SpanNoti = styled.span`
  height: 20px;
  width: 20px;
  background-color: #ff3a3a;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 50%;
`;
export const Menssage = styled.p<any>`
  display: inline-block;
  background-color: ${({$isUser}: any) => ($isUser ? '#0662ab' : '#575757')};
  padding: 0.5rem;
  border-radius: 40px;
`;
