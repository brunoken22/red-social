export const DivPerfilUser = ({children}: {children: React.ReactNode}) => (
  <div className='w-full '>{children}</div>
);

export const DivHeadPerfil = ({children}: {children: React.ReactNode}) => (
  <div className='pb-4 border-b-[1px] border-b-[#383838] flex justify-around items-center max-md:flex-col'>
    {children}
  </div>
);

export const DivFotoName = ({children}: {children: React.ReactNode}) => (
  <div className='flex gap-4 items-center max-md:flex-col'>{children}</div>
);

export const DivFotoNameLink = ({children}: {children: React.ReactNode}) => (
  <div className='flex gap-4 items-center justify-evenly max-md:flex-col'>
    {children}
  </div>
);

export const DivButton = ({children}: {children: React.ReactNode}) => (
  <div className='max-md:flex'>{children}</div>
);

export const DivButtonEliAcep = ({children}: {children: React.ReactNode}) => (
  <div className='flex gap-4 max-md:flex'>{children}</div>
);

export const DivPublicaciones = ({children}: {children: React.ReactNode}) => (
  <div className='m-auto mt-4 mb-4 max-w-[500px] flex flex-col gap-6'>
    {children}
  </div>
);
