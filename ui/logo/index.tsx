export default function LogoPage() {
  return (
    <div className={`flex items-center justify-center font-bold `}>
      <img
        src='/logo.webp'
        alt='uniRed'
        className='w-[40px] rounded-[50%] mr-2'
      />
      <p>UniRed</p>
    </div>
  );
}
