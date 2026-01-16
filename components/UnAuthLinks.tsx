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
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <div className="flex gap-10 items-center justify-start h-full">
      {navLinks?.["unauth"]?.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="hover:bg-gray-200 p-2 rounded-full cursor-pointer hover:border"
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default UnAuthLinks;
