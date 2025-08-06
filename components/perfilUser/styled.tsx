export const DivPerfilUser = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full pb-5'>{children}</div>
);

export const DivHeadPerfil = ({ children }: { children: React.ReactNode }) => (
  <div className='-mt-10 pb-4 border-b-[1px] border-b-[#383838] flex justify-between items-end max-md:items-center max-md:flex-col mb-4'>
    {children}
  </div>
);

export const DivFotoName = ({ children }: { children: React.ReactNode }) => (
  <div className='flex gap-4 items-end max-md:items-center max-md:flex-col'>{children}</div>
);

export const DivFotoNameLink = ({ children }: { children: React.ReactNode }) => (
  <div className='flex gap-4 max-md:items-center items-end  justify-evenly max-md:flex-col'>
    {children}
  </div>
);

export const DivButton = ({ children }: { children: React.ReactNode }) => (
  <div className='max-md:flex rounded-md'>{children}</div>
);

export const DivButtonEliAcep = ({ children }: { children: React.ReactNode }) => (
  <div className='flex gap-4 max-md:flex'>{children}</div>
);

export const DivPublicaciones = ({ children }: { children: React.ReactNode }) => (
  <div className='m-auto w-full flex flex-col gap-6 mt-4'>{children}</div>
);
