import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { PropsWithChildren } from "react";
import { Nav } from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="bg-[#0c0c0c]">
      <body
        className={`${inter.className} bg-[#0c0c0c] before:absolute before:inset-0  before:bg-[url('/grain.png')] before:bg-repeat before:opacity-[3%] `}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
