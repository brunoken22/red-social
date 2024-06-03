import React from 'react';

export const ImageLogo = ({src, alt}: {src: string; alt: string}) => (
  <img
    src={src}
    alt={alt}
    className='rounded-full  h-[25px] animate-spin absolute'
  />
);

export const DivLoader = ({children}: {children: React.ReactNode}) => (
  <div className='absolute flex items-center justify-center inset-0 backdrop-blur-md z-10'>
    {children}
  </div>
);
