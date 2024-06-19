import React from 'react';

export const DivTemMensaje = ({children}: {children: React.ReactNode}) => (
  <div className='flex w-full h-full justify-around gap-4 flex-wrap'>
    {children}
  </div>
);

export const TemplMensaje = ({children}: {children: React.ReactNode}) => (
  <div className='flex flex-col gap-4 mb-4'>{children}</div>
);

export const TemplChat = ({children}: {children: React.ReactNode}) => (
  <div className='flex flex-col gap-4 max-md:gap-2 '>{children}</div>
);

export const TemplSns = ({children}: {children: React.ReactNode}) => (
  <div className='flex flex-col gap-4 max-w-[800px] w-[90%] border-[1px] border-[#3b3b3b] rounded-md max-lg:p-3'>
    {children}
  </div>
);

export const Sms = ({children, ref}: {children: React.ReactNode; ref: any}) => (
  <div
    ref={ref}
    className='flex flex-col w-full text-primary gap-2 p-4  overflow-y-auto min-h-[50vh]'>
    {children}
  </div>
);

export const SpanNoti = ({children}: {children: React.ReactNode}) => (
  <span className='h-[20px] w-[20px] bg-[#ff3a3a]  absolute right-0 top-0 rounded-full text-[0.8rem] flex items-center justify-center'>
    {children}
  </span>
);

export const Menssage = ({
  children,
  isUser,
}: {
  children: React.ReactNode;
  isUser: boolean;
}) => (
  <p
    className={`inline-block p-2 rounded-[40px] max-w-full ${
      isUser ? 'bg-[#0662ab]' : 'bg-[#575757]'
    }`}>
    {children}
  </p>
);

// word-wrap: break-word;
