import React from 'react';

export const DivEnlaces = ({ children }: { children: React.ReactNode }) => (
  <div className='flex flex-col gap-1 bg-primary p-4 rounded-xl  dark:bg-darkComponet dark:transition-dark w-[230px]'>
    {children}
  </div>
);

export const Button = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => any;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={`m-0 bg-transparent text-[#ff7c7c] hover:text-red-500 flex items-center gap-2 ${className}`}>
    {children}
  </button>
);

export const Span = ({ children }: { children: React.ReactNode }) => (
  <span className=' hover:opacity-70 whitespace-nowrap overflow-hidden text-ellipsis'>
    {children}
  </span>
);
