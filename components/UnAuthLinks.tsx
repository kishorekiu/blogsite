"use client";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React from "react";

interface UnAuthLinksProps {
  navLinks: {
    unauth: {
      name: string;
      href: string;
    }[];
  };
}

const UnAuthLinks = (props: UnAuthLinksProps) => {
  const { navLinks } = props;
  // Note: isAuth isn't used here, but kept if you plan to extend logic
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className="flex gap-4 sm:gap-6 items-center justify-start h-full">
      {navLinks?.["unauth"]?.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="px-4 py-2 rounded-full cursor-pointer border border-transparent transition-all duration-200
            text-gray-600 hover:bg-gray-100 hover:border-gray-300
            dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:hover:text-white"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default UnAuthLinks;
