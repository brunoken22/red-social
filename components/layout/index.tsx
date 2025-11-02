"use client";
import React from "react";
import RecoilRootLayout from "./recoilRoot";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
  themeDate,
}: {
  children: React.ReactNode;
  themeDate: string;
}) {
  return (
    <SessionProvider>
      <RecoilRootLayout dateTheme={themeDate}>{children}</RecoilRootLayout>
    </SessionProvider>
  );
}
