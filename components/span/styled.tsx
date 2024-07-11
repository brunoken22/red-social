export const DivSpan = ({children}: {children: React.ReactNode}) => (
  <div className='min-w-[250px] max-w-[20%]  text-center  max-md:hidden'>
    {children}
  </div>
);

export const DivSvg = ({children}: {children: React.ReactNode}) => (
  <div className='flex justify-around items-center'>{children}</div>
);
