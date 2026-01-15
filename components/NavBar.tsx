import { getDataFromToken } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AuthLinks from "./AuthLinks";

const navLinks = {
  unauth: [
    { name: "Sign In", href: "/auth/login" },
    { name: "Sign Up", href: "/auth/register" },
  ],
  signOut: { name: "Sign Out", href: "/" },
  profile: { name: "Profile", href: "/auth/profile" },
};
const NavBar = async () => {
  const isAuth = await getDataFromToken();
  console.log("userId", isAuth);
  return (
    <div className="sticky top-0 z-50 bg-white px-20 h-20 flex justify-between border-b border-b-gray-200">
      <div className="flex items-center justify-start h-full">
        <Link href={"/"}>
          <p className="text-3xl font-bold">BlogSite</p>
        </Link>
      </div>
      <div className="flex gap-10 items-center justify-start h-full">
        {!isAuth &&
          navLinks?.["unauth"]?.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:bg-gray-200 p-2 rounded-full cursor-pointer hover:border"
            >
              {link.name}
            </Link>
          ))}
        <AuthLinks
          isAuth={isAuth}
          signOut={navLinks?.["signOut"]}
          profile={navLinks?.["profile"]}
        />
      </div>
    </div>
  );
};

export default NavBar;
