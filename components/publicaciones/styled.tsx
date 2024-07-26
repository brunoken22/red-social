export const DivPerfil = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`flex gap-4  ${className}`}>{children}</div>;

export const DivSpan = ({children}: {children: React.ReactNode}) => (
  <span className='block text-[0.7rem] '>{children}</span>
);

export const SpanIco = ({
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseEnter?: () => any;
  onMouseLeave?: () => any;
}) => (
  <span
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className=' text-[0.7rem]  flex items-center justify-center gap-[0.2rem] mb-[0.2rem] relative'>
    {children}
  </span>
);

export const ButtonOpenImage = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className='w-full  text-transparent border-none hover:opacity-70 overflow-hidden'>
    {children}
  </button>
);

export const DivImage = ({children}: {children: React.ReactNode}) => (
  <div className='flex items-center relative  h-[300px] overflow-hidden	'>
    {children}
  </div>
);

export const DivCantidad = ({children}: {children: React.ReactNode}) => (
  <div className='items-center grid gap-0 mt-4 justify-center grid-cols-[repeat(2,1fr)] relative'>
    {children}
  </div>
);

export const DivInteractuar = ({children}: {children: React.ReactNode}) => (
  <div className='flex  items-center pt-1 pb-1 justify-around gap-0 border-t-[1px] border-dark '>
    {children}
  </div>
);

export const BottonLike = ({
  children,
  type,
  id,
  like,
  onClick,
}: {
  children: React.ReactNode;
  type: string | any;
  onClick: (e: any) => any;
  id: string;
  like?: boolean;
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    className={` border-none  flex items-center gap-2 text-[0.8rem] p-2 hover:backdrop-contrast-50 rounded-md  ${
      like
        ? 'dark:text-[#7696fd] text-[#063ef5]'
        : 'text-secundary dark:text-primary'
    }`}>
    {children}
  </button>
);

export const BottonComentar = ({
  children,
  type,
  id,
  onClick,
}: {
  children: React.ReactNode;
  type: string | any;
  onClick: (e: any) => any;
  id: string;
}) => (
  <button
    id={id}
    type={type}
    onClick={onClick}
    className='bg-transparent border-none text-secundary flex items-center gap-2 text-[0.8rem] p-2 hover:bg-primary hover:rounded-md '>
    {children}
  </button>
);

export const BottonSendComentario = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    aria-label='Comentar'
    onClick={onClick}
    className='bg-transparent  flex items-center justify-center h-full rounded-md border-solid border-[1px]  border-gray-400 hover:border-gray-600 dark:hover:border-gray-100 dark:fill-white dark:hover:fill-light hover:fill-light'>
    {children}
  </button>
);

export const DivAñadirComentar = ({children}: {children: React.ReactNode}) => (
  <div className='rounded-md w-full  p-2 grid items-center text-[0.9rem] grid-cols-[repeat(1,90%_10%)] focus:border-2 focus:border-red-500 gap-2'>
    {children}
  </div>
);

export const DivPefilDelete = ({children}: {children: React.ReactNode}) => (
  <div className='flex items-center justify-between p-4 max-md:p-2'>
    {children}
  </div>
);

export const ButtonOpenDelete = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    aria-label='deletePublication'
    onClick={onClick}
    className='flex gap-[0.2rem] bg-transparent border-none hover:opacity-70 h-[35px] w-[35px] justify-center items-center hover:backdrop-contrast-50 hover:rounded-full'>
    {children}
  </button>
);

export const ContentDelete = () => (
  <span className='h-[5px] w-[5px] bg-secundary dark:bg-primary rounded-full '></span>
);

export const ButtonDelete = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className='absolute bg-secundary text-primary dark:bg-primary dark:text-secundary  border-none mt-2 p-2 pl-4 pr-4 right-0 hover:opacity-70 '>
    {children}
  </button>
);

export const ButtonMasPubli = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: any) => any;
}) => (
  <button
    onClick={onClick}
    className='border-none bg-transparent  hover:opacity-70 dark:text-primary p-2 w-full'>
    {children}
  </button>
);

export const DivUserLikes = ({children}: {children: React.ReactNode}) => (
  <div className='absolute bottom-[2rem] left-0 right-0 bg-black text-primary p-4 m-auto text-[0.8rem] font-black rounded-sm '>
    {children}
  </div>
);
