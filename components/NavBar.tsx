import Link from "next/link";
import React from "react";

const navLinks = [
  { name: "Sign In", href: "/auth/login" },
  { name: "Sign Up", href: "/auth/register" },
];
const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white px-20 h-20 flex justify-between border-b border-b-gray-200">
      <div className="flex items-center justify-start h-full">
        <Link href={"/"}>
          <p className="text-3xl font-bold">BlogSite</p>
        </Link>
      </div>
      <div className="flex gap-10 items-center justify-start h-full">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
