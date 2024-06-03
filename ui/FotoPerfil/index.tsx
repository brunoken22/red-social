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
    <div className={`${className}`}>
      <img
        src={(img == 'false' && '/user.webp') || img || '/user.webp'}
        className={`${
          className ? className : 'w-[40px] h-[40px]'
        } rounded-full object-cover border-2 border-gray-700`}
        alt='perfil'
        loading='lazy'
      />
      {connect && className ? (
        <div
          className={`${
            className ? className : 'w-[11px] h-[11px]'
          } rounded-full absolute bottom-0 right-0`}></div>
      ) : null}
    </div>
  );
}
