import React from 'react';

export const HeaderNav = ({children}: {children: React.ReactNode}) => (
  <header className='p-2 bg-primary fixed right-0 left-0 <-10'>
    {children}
  </header>
);

export const DivInputSearch = ({children}: {children: React.ReactNode}) => (
  <div className='border-none relative max-md:none'>{children}</div>
);

export const Nav = ({children}: {children: React.ReactNode}) => (
  <nav className='flex justify-evenly items-center text-secundary max-md:justify-between'>
    {children}
  </nav>
);

export const DivEnlaces = ({children}: {children: React.ReactNode}) => (
  <div className='flex justify-evenly items-center gap-8 text-secundary max-md:gap-4'>
    {children}
  </div>
);

export const DivNotificacionActi = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='w-[18px] h-[18px] bg-red-500 rounded-full absolute right-[-10px] text-primary  flex top-[-10px] justify-center items-center text-[0.7rem] font-bold'>
    {children}
  </div>
);

export const Enlaces = ({
  children,
  isPathname,
}: {
  children: React.ReactNode;
  isPathname: boolean;
}) => (
  <span className={`${isPathname && 'fill-[#fff] hover:fill-[#fff]'}`}>
    {children}
  </span>
);

export const EnlaceSearch = ({
  children,
  isPathname,
}: {
  children: React.ReactNode;
  isPathname: boolean;
}) => (
  <span
    className={`${
      isPathname && 'fill-[#fff] hover:fill-[#fff]'
    } hidden fill-[#b3b3b3] max-md:block`}>
    {children}
  </span>
);

export const Button = ({children}: {children: React.ReactNode}) => (
  <button className={`m-0 bg-transparent border-none `}>{children}</button>
);

export const DivConnectAll = ({children}: {children: React.ReactNode}) => (
  <div className={`bg-primary flex flex-col items-center justify-around`}>
    {children}
  </div>
);

export const DivContenedorConnect = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    className={`fixed bottom-0 right-[1%] text-secundary w-[250px] z-10 max-md:hidden`}>
    {children}
  </div>
);

export const DivConectados = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-around h-[40px] bg-[#a8c0ff] rounded-tr-[10px] rounded-tl-[10px] w-full`}>
    {children}
  </button>
);

export const DivConnect = () => (
  <div className={`w-[15px] h-[15px] bg-green-800 rounded-full`}></div>
);
