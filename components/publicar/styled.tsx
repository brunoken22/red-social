import React, {FormEvent} from 'react';

export const DivText = ({children}: {children: React.ReactNode}) => (
  <div className='flex gap-4 w-full  items-center'>{children}</div>
);
export const DivSubir = ({children}: {children: React.ReactNode}) => (
  <div className='flex justify-around border-t-[1px] border-t-[#474747]'>
    {children}
  </div>
);

export const DivASubir = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className='flex items-center gap-4 mt-2  rounded-md p-1 hover:backdrop-contrast-50 hover:overflow-hidden'>
    {children}
  </button>
);

export const DivForm = ({children}: {children: React.ReactNode}) => (
  <div className='flex items-center justify-center fixed inset-0  z-10 text-black backdrop-brightness-50'>
    {children}
  </div>
);

export const Form = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: FormEvent) => any;
}) => (
  <form
    className='flex flex-col p-4  rounded-md bg-primary dark:bg-darkComponet dark:text-primary'
    onSubmit={onSubmit}>
    {children}
  </form>
);

export const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: any) => any;
}) => (
  <button
    id='close'
    className='border-none bg-transparent  hover:rounded-full hover:opacity-70'
    onClick={onClick}>
    {children}
  </button>
);

export const InputP = ({
  children,
  text,
  onInput,
  suppressContentEditableWarning,
  contentEditable,
  placeholder,
}: {
  text: boolean;
  onInput: (e: any) => any;
  suppressContentEditableWarning: boolean;
  contentEditable: boolean;
  placeholder: string;
  children?: React.ReactNode;
}) => (
  <p
    suppressContentEditableWarning={suppressContentEditableWarning}
    contentEditable={contentEditable}
    onInput={onInput}
    className={`outline-none w-full p-2  ${
      text ? 'before:text-[#696969]' : ''
    } placeholder:text-red-600`}
    placeholder={placeholder}>
    {children ? children : ''}
  </p>
);

export const DivCrear = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => any;
}) => (
  <button
    onClick={onClick}
    className={`w-[88%]  rounded-md p-2 flex items-center hover:opacity-70 border-[1px] border-black dark:border-dark`}>
    {children}
  </button>
);

export const DivButton = ({children}: {children: React.ReactNode}) => (
  <div className={`mt-4 mb-4`}>{children}</div>
);

export const ButtonPublicar = ({
  children,
  color,
  disabled,
}: {
  children: React.ReactNode;
  color: string;
  disabled: boolean;
}) => (
  <button
    type='submit'
    disabled={disabled}
    className={`w-full p-2 text-primary ${
      color ? 'bg-light  cursor-pointer' : 'bg-[#3e485e] cursor-not-allowed'
    } border-none rounded-md hover:opacity-70`}>
    {children}
  </button>
);
