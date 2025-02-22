export default function FotoPerfil({
  className,
  img,
  connect,
  isBorder = false,
}: {
  className: string;
  img: string | undefined;
  connect?: boolean | undefined;
  isBorder?: boolean;
}) {
  return (
    <div className={` relative shrink-0 ${className ? className : 'w-[40px] h-[40px]'} `}>
      <img
        src={(img == 'false' && '/user.webp') || img || '/user.webp'}
        height={40}
        width={40}
        className={`${className ? className : 'w-[40px] h-[40px]'} rounded-full object-cover ${
          isBorder ? 'border-4' : ''
        } dark:border-darkComponet border-inherit`}
        alt='perfil'
        loading='lazy'
      />
      {connect ? (
        <div
          className={` bg-green-500 w-[14px] h-[14px] rounded-full absolute bottom-[10%] right-[-5%] border-2 border-zinc-900`}></div>
      ) : null}
    </div>
  );
}
