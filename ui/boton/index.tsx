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
  active,
}: {
  children: React.ReactNode;
  onClick: () => any;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`${
      active ? 'bg-black' : 'bg-inherit'
    } border-none text-xl  text-primary rounded-md w-full h-auto m-[0.1rem] hover:bg-secundary hover:text-primary hover:rounded-none`}>
    {children}
  </button>
);

export const ButtonNoti = ({
  children,
  onClick,
  visto,
  open,
  id,
}: {
  children: React.ReactNode;
  onClick?: (e: any) => any;
  visto?: boolean;
  open?: boolean;
  id?: string;
}) => (
  <button
    id={id}
    onClick={onClick}
    className={`flex items-center gap-4 w-full border-none h-16 rounded-md p-2${
      visto ? 'bg-hoverPrimary' : ''
    } ${
      open
        ? 'opacity-70 dark:fill-white fill-black'
        : 'dark:fill-[#e5e7eb] fill-gray-800'
    } hover:opacity-60   `}>
    {children}
  </button>
);

export const ButtonAgregar = ({
  children,
  onClick,
  bg,
  id,
}: {
  children: React.ReactNode;
  onClick: (e: any) => any;
  bg?: string;
  id: any;
}) => (
  <button
    id={id}
    onClick={onClick}
    className={`${
      bg == 'red'
        ? 'bg-[#ff5252] hover:bg-[#ff5252]'
        : 'bg-[#4298ed] hover:bg-[#4298ed]'
    } border-none text-[0.8rem] p-[0.7rem] rounded-xl text-primary max-md:p-2`}>
    {children}
  </button>
);
