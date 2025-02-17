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
    <div className={` relative shrink-0`}>
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
          className={` bg-green-500 w-[11px] h-[11px] rounded-full absolute bottom-[10%] right-0`}></div>
      ) : null}
    </div>
  );
}
