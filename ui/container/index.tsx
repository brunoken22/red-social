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
  <div className='max-w-[500px] w-full max-md:w-full flex flex-col gap-8 max-md:gap-4'>
    {children}
  </div>
);

export const DivPublicar = ({children}: {children: React.ReactNode}) => (
  <div
    className={` bg-primary max-w-[500px] w-[inherit] h-max  p-4 flex flex-col justify-evenly gap-4 rounded-md shadow-container  max-md:w-auto  dark:bg-darkComponet dark:text-primary dark:shadow-none text-center`}>
    {children}
  </div>
);

export const DivAllChat = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`${className} relative bg-primary  flex gap-4 rounded-md shadow-container   max-md:mt-4 flex-row items-center p-4 max-md:w-auto hover:opacity-70 dark:bg-darkComponet dark:text-primary dark:transition-dark`}>
    {children}
  </div>
);

export const DivAllAmistades = ({
  children,
  requestClassDuo,
}: {
  children: React.ReactNode;
  requestClassDuo: boolean;
}) => (
  <div
    className={`bg-primary rounded-md shadow-container  max-md:mt-4 w-[185px]  dark:bg-darkComponet grid ${
      !requestClassDuo
        ? 'grid-rows-[repeat(1,200px_100px)]'
        : 'grid-rows-[repeat(1,200px_150px)]'
    }`}>
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
