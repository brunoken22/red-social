export const Label = ({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className='block text-[0.9rem]'>
    {children}
  </label>
);
export const Input = ({
  id,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
}: {
  id?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: any) => any;
}) => (
  <input
    onChange={onChange}
    defaultValue={value}
    autoComplete={autoComplete}
    id={id}
    type={type}
    placeholder={placeholder}
    className='w-full h-[2.5rem] rounded-md border-[1px] text-black border-gray-700 indent-3 p-0'
  />
);
