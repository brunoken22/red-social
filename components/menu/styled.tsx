import React from 'react';

export const DivEnlaces = ({ children }: { children: React.ReactNode }) => <div className='flex flex-col gap-4 bg-primary p-4 rounded-xl  dark:bg-darkComponet dark:transition-dark w-[180px]'>{children}</div>;

export const Button = ({ children, onClick }: { children: React.ReactNode; onClick: () => any }) => (
  <button onClick={onClick} className='m-0 bg-transparent text-[#ff7c7c] hover:text-red-500 flex items-center gap-2'>
    {children}
  </button>
);

export const Span = ({ children }: { children: React.ReactNode }) => <span className=' hover:opacity-70 whitespace-nowrap overflow-hidden text-ellipsis'>{children}</span>;
