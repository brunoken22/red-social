import React from 'react';

export const Title = ({
  children,
  classType,
}: {
  children: React.ReactNode;
  classType?: any;
}) => (
  <h1 className={`${classType} font-bold text-4xl text-center`}>{children}</h1>
);
// export const Subtitle = styled.h2``;
export const Body = ({
  children,
  classType,
}: {
  children: React.ReactNode;
  classType?: any;
}) => <p className={`m-0 z-0 text-sm ${classType}   `}>{children}</p>;
