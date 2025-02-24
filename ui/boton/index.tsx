export const Button = ({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => any;
  active: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${
      active ? 'bg-black' : 'bg-inherit'
    } border-none text-xl h-16 text-primary rounded-md`}>
    {children}
  </button>
);

export const ButtonSms = ({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => any;
  active: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${
      active ? 'bg-black' : 'bg-inherit'
    } border-none text-xl  text-primary rounded-md relative max-w-[350px] h-full`}>
    {children}
  </button>
);

export const ButtonSmsConnect = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className={` flex items-center gap-2
      text-primary rounded-md w-full h-auto m-[0.1rem] hover:opacity-70 p-4`}>
    {children}
  </button>
);

export const ButtonNoti = ({
  children,
  onClick,
  visto,
  open,
  id,
  className,
}: {
  children: React.ReactNode;
  onClick?: (e: any) => any;
  visto?: boolean;
  open?: boolean;
  id?: string;
  className?: string;
}) => (
  <button
    id={id}
    onClick={onClick}
    className={`flex items-center text-start   gap-4 w-full border-none h-16 rounded-md p-2 ${
      visto ? 'dark:bg-[#1c1c1c] bg-hoverPrimary' : ''
    } ${
      open ? 'opacity-70 dark:fill-white fill-black' : 'dark:fill-[#e5e7eb] fill-gray-800'
    } hover:opacity-60 max-md:text-nowrap  max-md:text-primary max-md:fill-primary  max-md:text-sm	 max-md:h-auto ${
      className ? className : ''
    }`}>
    {children}
  </button>
);

export const ButtonAgregar = ({
  children,
  onClick,
  bg,
  id,
  className,
}: {
  children: React.ReactNode;
  onClick: (e: any) => any;
  bg?: string;
  id: any;
  className?: string;
}) => (
  <button
    id={id}
    onClick={onClick}
    className={`${
      bg == 'red'
        ? 'bg-[#dfdedec7] p-2  text-secundary dark:bg-[#575757c7] dark:text-primary'
        : '  bg-[#6ab0fc63] text-[#3359ff] dark:bg-[#27517e] dark:text-[#46a3fa] font-bold p-2'
    } w-full border-none   rounded-lg  hover:opacity-60 text-nowrap ${className ? className : ''}`}>
    {children}
  </button>
);
