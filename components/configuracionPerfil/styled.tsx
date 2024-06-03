import React from 'react';

export const DivConfiguracionPerfil = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='w-full flex justify-evenly gap-4 max-md:flex-col max-md:items-center'>
    {children}
  </div>
);

export const DIvCongifurar = ({children}: {children: React.ReactNode}) => (
  <div className='max-w-[60%] w-full h-full pl-4 max-md:text-center max-md:mt-6 max-md:max-w-full'>
    {children}
  </div>
);
