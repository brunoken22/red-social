import React from 'react';
export const Main = ({children}: {children: React.ReactNode}) => (
  <main className=' flex gap-12 flex-wrap h-full '>{children}</main>
);

export const DivMain = ({children}: {children: React.ReactNode}) => (
  <main className='  flex gap-12 flex-wrap  items-center h-full'>
    {children}
  </main>
);

export const DivSvgSingin = ({children}: {children: React.ReactNode}) => (
  <div className='w-[50%] h-[100vh] flex items-center justify-center bg-black'>
    {children}
  </div>
);

export const DivButton = ({children}: {children: React.ReactNode}) => (
  <div className='rounded-md'>{children}</div>
);

export const ContainerMain = ({children}: {children: React.ReactNode}) => (
  <div className='flex justify-center w-full gap-6 '>{children}</div>
);

export const DivPublicaciones = ({children}: {children: React.ReactNode}) => (
  <div className='max-w-[500px] w-full max-md:w-full flex flex-col gap-8'>
    {children}
  </div>
);

export const DivPublicar = ({children}: {children: React.ReactNode}) => (
  <div className='bg-primary  p-4 flex flex-col gap-4 rounded-md shadow-container  max-md:w-auto max-md:mt-4 dark:bg-darkComponet dark:text-primary dark:shadow-none text-center  max-w-screen-md	m-auto '>
    {children}
  </div>
);

export const DivAllChat = ({children}: {children: React.ReactNode}) => (
  <div className='relative bg-primary  flex gap-4 rounded-md shadow-container   max-md:mt-4 flex-row items-center p-4 max-md:w-auto hover:opacity-70 dark:bg-darkComponet dark:text-primary dark:transition-dark'>
    {children}
  </div>
);

export const DivAllConnect = ({children}: {children: React.ReactNode}) => (
  <main className='text-black pl-4 pr-4 flex gap-12 flex-wrap min-h-[100vh] items-center p-[0.3rem] flex-row m-0 border-none bg-transparent  '>
    {children}
  </main>
);

export const DivAllAmistades = ({children}: {children: React.ReactNode}) => (
  <div className='bg-primary flex-col rounded-md shadow-container  max-md:mt-4 w-[185px] h-[300px] p-0   max-md:w-[160px] dark:bg-darkComponet flex justify-between'>
    {children}
  </div>
);

export const DivAllPublicaciones = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='bg-primary p-4 flex flex-col gap-4 rounded-md shadow-container  max-md:mt-4 max-md:w-auto max-md:p-3 dark:bg-darkComponet dark:text-primary dark:shadow-none'>
    {children}
  </div>
);

export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: any) => any;
}) => (
  <form
    onSubmit={onSubmit}
    className='flex flex-col gap-4 max-w-[500px] w-[90%] p-4'>
    {children}
  </form>
);
