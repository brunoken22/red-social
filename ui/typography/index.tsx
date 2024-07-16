import React from 'react';
import {Roboto_Slab} from 'next/font/google';

const robotoSlab = Roboto_Slab({weight: ['500', '800'], subsets: ['latin']});

export const Title = ({children}: {children: React.ReactNode}) => (
  <h1 className={`${robotoSlab.className} font-bold text-4xl text-center`}>
    {children}
  </h1>
);
export const Body = ({children}: {children: React.ReactNode}) => (
  <p
    className={`  ${robotoSlab.className} max-w-[250px] whitespace-nowrap	 overflow-hidden text-ellipsis`}>
    {children}
  </p>
);
