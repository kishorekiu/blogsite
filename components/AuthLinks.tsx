"use client";
import Link from "next/link";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

interface AuthLinksProps {
  isAuth: boolean;
  signOut: {
    name: string;
    href: string;
  };
  profile: {
    name: string;
    href: string;
  };
}
const AuthLinks = (props: AuthLinksProps) => {
  const { isAuth, signOut, profile } = props;
  console.log("kiss props", props);

  return (
    <div className="flex gap-10 items-center justify-start h-full">
      {isAuth && (
        <div
          key={signOut?.name}
          // href={signOut?.href}
          className="hover:bg-gray-200 p-2 rounded-full cursor-pointer hover:border"
          onClick={() => {
            // delete cookie - token
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}
        >
          {signOut?.name}
        </div>
      )}
      {isAuth && (
        <>
          <div className="flex align-middle border rounded-full py-2 px-3 cursor-pointer hover:bg-gray-200">
            <AccountBoxIcon />
            <Link href={profile?.href || ""}>{profile?.name}</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthLinks;
