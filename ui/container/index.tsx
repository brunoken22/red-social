import React from "react";
export const Main = ({ children }: { children: React.ReactNode }) => (
  <main className=' flex gap-12 flex-wrap h-full '>{children}</main>
);

export const DivMain = ({ children }: { children: React.ReactNode }) => (
  <main className='  flex gap-12 flex-wrap  items-center h-full'>{children}</main>
);

export const DivSvgSingin = ({ children }: { children: React.ReactNode }) => (
  <div className='w-[50%] h-[100vh] flex items-center justify-center bg-black'>{children}</div>
);

export const DivButton = ({ children }: { children: React.ReactNode }) => (
  <div className='rounded-md'>{children}</div>
);

export const ContainerMain = ({ children }: { children: React.ReactNode }) => (
  <div className='flex justify-center w-full gap-6 '>{children}</div>
);

export const DivPublicaciones = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full max-md:w-full flex flex-col gap-8 max-md:gap-4'>{children}</div>
);

export const DivPublicar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={` bg-primary  
   h-max  p-2   grid flex-col justify-normal gap-4 rounded-md shadow-container w-full  dark:bg-darkComponet dark:text-primary dark:shadow-none text-center ${
     className ? className : " w-full"
   }`}
  >
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
    className={`${className} relative   flex gap-4 rounded-md flex-row items-center p-4   w-full`}
  >
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
    className={`max-sm:p-2 bg-primary rounded-md overflow-hidden shadow-container dark:shadow-dark max-md:mt-4 w-[200px]  max-sm:w-full max-sm:h-[150px] dark:bg-darkComponet grid ${
      !requestClassDuo
        ? "grid-rows-[repeat(1,200px_100px)] max-sm:grid-rows-none max-sm:grid-cols-[repeat(1,140px_1fr)]"
        : "grid-rows-[repeat(1,200px_150px)] max-sm:grid-rows-none max-sm:grid-cols-[repeat(1,140px_1fr)]"
    }`}
  >
    {children}
  </div>
);

export const DivAllPublicaciones = ({ children }: { children: React.ReactNode }) => (
  <div className='bg-primary flex flex-col gap-4 rounded-md shadow-container  max-md:w-auto  dark:bg-darkComponet dark:text-primary dark:shadow-dark'>
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
    className='flex flex-col gap-4 max-w-[500px] w-[90%] pt-4 pb-4 max-md:m-auto'
  >
    {children}
  </form>
);
