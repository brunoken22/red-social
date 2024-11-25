export const Section = ({ children }: { children: React.ReactNode }) => (
  <section className='flex w-full gap-8 justify-between max-md:justify-evenly max-md:flex-wrap'>{children}</section>
);

export const DivSection = ({ children }: { children: React.ReactNode }) => <div className='max-w-[800px] '>{children}</div>;

export const DivResponse = ({ children }: { children: React.ReactNode }) => (
  <div className='w-full flex justify-start flex-wrap gap-4 max-sm:gap-0'>{children}</div>
);

export const DivIcons = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex ${className ? className : ''}`}>{children}</div>
);

export const DivResult = ({ children }: { children: React.ReactNode }) => (
  <div className=' w-[90%] max-md:w-full text-center mt-0 max-md:mt-6  pb-4 '>{children}</div>
);
