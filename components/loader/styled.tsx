import React from 'react';

export const ImageLogo = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className='rounded-full  h-[25px] animate-spin ' />
);

export const DivLoader = ({ children }: { children: React.ReactNode }) => (
  <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center backdrop-brightness-[0.2] text-primary z-10 text-center'>
    {children}
  </div>
);
