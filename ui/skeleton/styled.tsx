import React from 'react';

export const DivSkeleton = ({children}: {children: React.ReactNode}) => (
  <div className='w-full'>{children}</div>
);
export const PhotoSkeleton = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-full bg-[#858585] relative overflow-auto h-[80px] w-[80px]${className}`}>
    {children}
  </div>
);

export const TextSkeleton = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#858585] relative overflow-auto w-[120px] h-[30px] m-0 ${className}`}>
    {children}
  </div>
);

export const TemplePubliSkeleton = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#474747] p-4 flex flex-col justify-around max-md:w-auto max-md:m-8 max-md:ml-auto max-md:mr-auto w-[500px] h-[30px] m-0 ${className}`}>
    {children}
  </div>
);

export const SpanLuz = () => (
  <span className='absolute top-0 bottom-0 animate-animationSkeleton'></span>
);
