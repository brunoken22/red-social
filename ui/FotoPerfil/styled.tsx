import sytled from 'styled-components';

export const Figure = sytled.div<any>`
    width:${((props: any) => props.wid) || '40px'};
    height:${((props: any) => props.hei) || '40px'};
    border-radius: 50%;
    margin:0
`;
