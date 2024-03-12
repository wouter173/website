"use client";
import Image from "next/image";
import LogoSrc from "@/../public/logo.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = {
  gallery: "/",
  blog: "/blog",
};

export const Nav = () => {
  const pathname = usePathname();
  const [hoverTab, setActiveTab] = useState<keyof typeof links | null>(null);

  const keys = Object.keys(links) as (keyof typeof links)[];

  let activeTab = keys.find((key) => links[key].startsWith(pathname));
  if (hoverTab) activeTab = hoverTab;

  return (
    <nav className="fixed top-0 z-30 mt-12 h-28 w-full pb-4 pt-0">
      <motion.ul layoutRoot className="relative mx-auto flex max-w-4xl items-center gap-4" layout>
        <Image src={LogoSrc} alt="Wouter de Bruijn Logo" className="mr-2" />

        {keys.map((name) => (
          <Link
            key={name}
            href={links[name]}
            className="relative px-2.5 py-0.5 transition-all active:scale-95"
            onMouseEnter={() => setActiveTab(name)}
            onMouseLeave={() => setActiveTab(null)}
          >
            {activeTab === name && (
              <motion.span
                layout
                layoutId="knob"
                className="absolute inset-0 -z-10 rounded-full bg-slate-50 shadow-sm"
                style={{ originY: "top" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="font-medium capitalize">{name}</span>
          </Link>
        ))}
      </motion.ul>
    </nav>
  );
};
