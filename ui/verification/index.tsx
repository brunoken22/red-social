export default function Verification({publication}: {publication: boolean}) {
  return (
    <span
      className={`bg-blue-500 rounded-full  flex items-center justify-center ${
        publication ? 'w-3 h-3  text-[0.5rem]' : 'w-4 h-4  text-[0.7rem]'
      }`}>
      ✔
    </span>
  );
}
