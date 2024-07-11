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
    className={` flex items-center gap-4
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
    className={`flex items-center text-start   gap-4 w-full border-none h-16 rounded-md p-2 ${
      visto ? 'dark:bg-[#1c1c1c] bg-hoverPrimary' : ''
    } ${
      open
        ? 'opacity-70 dark:fill-white fill-black'
        : 'dark:fill-[#e5e7eb] fill-gray-800'
    } hover:opacity-60`}>
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
        ? 'bg-[#b57b7b4f] text-[#d55656] p-2'
        : 'text-primary  bg-[#4c83bdcf]  p-2'
    } w-full border-none   rounded-xl  hover:opacity-60`}>
    {children}
  </button>
);
