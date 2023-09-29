import sytled, {keyframes} from 'styled-components';

export const HeaderNav = sytled.header`
    padding: 0.4rem;
    background-color:var(--bg);
    position: fixed;
    right: 0;
    left: 0;
    z-index: 10;

`;
export const InputDiv = sytled.div`
    display: inherit;
    gap: 1rem;
    align-items: center;
    @media(max-width:550px){
        input{
            display:none
        }
    }
`;
export const DivInputSearch = sytled.div`
    border: 0;
    position:relative;
    @media(max-width:550px){
            display:none
    }
`;
export const Nav = sytled.nav`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color:var(--color);
   @media(max-width:550px){
            justify-content: space-between;
    }

`;
export const DivEnlaces = sytled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap:2rem;
    color:var(--color);
    @media(max-width:550px){
        gap:1rem;

    }
`;
export const DivNotificacionActi = sytled.div`
    height:18px;
    width:18px;
    background-color:red;
    border-radius:50%;
    position: absolute;
    right: -10px;
    color: white;
    display: flex;
    top: -10px;
    justify-content: center;
    align-items: center;
    font-size: 0.7rem;
    font-weight: bold;
}
`;
export const Enlaces = sytled.span`
    &:hover{
        fill:#fff
    }
`;
export const EnlaceSearch = sytled(Enlaces)`
    display: none;
    fill: #b3b3b3;

    @media(max-width:550px){
    display: block;
    }

`;
export const Button = sytled.button`
    margin:0;
    background-color:transparent;
    border: none;
    cursor: pointer;
`;
export const DivConnectAll = sytled.div`
background-color: #fff;
display: flex;
flex-direction:column;
align-items: center;
justify-content: space-around;
`;
export const DivContenedorConnect = sytled.div`
    position: fixed;
    bottom: 0;
    right: 1%;
    color:#000;
    width: 250px;
    @media(max-width:900px){
        display:none
    }
`;
export const DivConectados = sytled.div`
display: flex;
align-items: center;
justify-content: space-around;
height: 40px;
background-color: #a8c0ff;
border-top-right-radius: 10px;
border-top-left-radius: 10px;
cursor:pointer
`;

export const DivConnect = sytled.div`
width: 15px;
height: 15px;
    background-color: green;
    border-radius:50%
 
`;
