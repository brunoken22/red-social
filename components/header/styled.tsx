import React from 'react';

export const DivNotificacionActi = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className='w-[18px] h-[18px] bg-red-500 rounded-full absolute right-[-10px] text-primary  flex top-[-10px] justify-center items-center text-[0.7rem] font-bold'>
    {children}
  </div>
);

export const DivConnectAll = ({children}: {children: React.ReactNode}) => (
  <div className={` backdrop-brightness-90  `}>{children}</div>
);

export const DivContenedorConnect = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div
    className={`fixed bottom-0 right-[1%] text-secundary w-[250px] z-10 max-md:hidden  bg-[#a8c0ff]  rounded-tr-[10px] rounded-tl-[10px]`}>
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
    className={`flex items-center justify-around h-[40px] w-full`}>
    {children}
  </button>
);

export const DivConnect = () => (
  <div className={`w-[15px] h-[15px] bg-green-800 rounded-full`}></div>
);
