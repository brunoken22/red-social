export const Section = ({children}: {children: React.ReactNode}) => (
  <section className='flex w-full justify-evenly max-md:flex-wrap'>
    {children}
  </section>
);

export const  DivSection = ({children}: {children: React.ReactNode}) => (
  <div className='max-w-[800px] '>{children}</div>
);

export const DivResponse = ({children}: {children: React.ReactNode}) => (
  <div className='max-w-[800px] flex justify-center flex-wrap gap-4'>
    {children}
  </div>
);

export const DivIcons = ({children}: {children: React.ReactNode}) => (
  <div className='flex'>{children}</div>
);

export const DivResult = ({children}: {children: React.ReactNode}) => (
  <div className='max-w-[800px] w-full text-center mt-0 max-md:mt-6'>
    {children}
  </div>
);

// export const DivImageSug = ({
//   img,
// }: {
//   children?: React.ReactNode;
//   img: string | null;
// }) => {
//   console.log(img);

//   return (
//     <div
//       className={`p-0 rounded-xl h-[60%] ${
//         img ? `bg-[url(/user.webp)]` : 'bg-[url(/user.webp)]'
//       } bg-center bg-cover`}></div>
//   );
// };
