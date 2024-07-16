export default function FotoPerfil({
  className,
  img,
  connect,
}: {
  className: string;
  img: string;
  connect?: boolean | undefined;
}) {
  return (
    <div className={`${className} relative shrink-0`}>
      <img
        src={(img == 'false' && '/user.webp') || img || '/user.webp'}
        height={40}
        width={40}
        className={`${
          className ? className : 'w-[40px] h-[40px]'
        } rounded-full object-cover border-2 border-gray-700`}
        alt='perfil'
        loading='lazy'
      />
      {connect ? (
        <div
          className={` bg-green-800 w-[11px] h-[11px] rounded-full absolute bottom-[10%] right-0`}></div>
      ) : null}
    </div>
  );
}
