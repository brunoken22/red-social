import React from 'react';

// export const DivMenu = ({
//   children,
//   onBlur,
// }: {
//   children: React.ReactNode;
//   onBlur: () => any;
// }) => (
//   <div tabIndex={0} className='absolute right-0' onBlur={onBlur}>
//     {children}
//   </div>
// );

export const DivEnlaces = ({children}: {children: React.ReactNode}) => (
  <div
    tabIndex={0}
    className='flex flex-col gap-4 bg-primary p-4 rounded-xl  dark:bg-darkComponet dark:transition-dark w-[180px]'>
    {children}
  </div>
);

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <span
    onClick={onClick}
    className='m-0 bg-transparent text-[#ff7c7c] hover:text-red-500 flex items-center gap-2'>
    {children}
  </span>
);

export const Span = ({children}: {children: React.ReactNode}) => (
  <span className=' hover:opacity-70'>{children}</span>
);
