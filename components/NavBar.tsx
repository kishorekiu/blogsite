import { getDataFromToken } from "@/lib/auth";
import Link from "next/link";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AuthLinks from "./AuthLinks";
import UnAuthLinks from "./UnAuthLinks";
import NavLinks from "./NavLinks";

const NavBar = async () => {
  return (
    <div className="sticky top-0 z-50 bg-white px-20 h-20 flex justify-between border-b border-b-gray-200">
      <div className="flex items-center justify-start h-full">
        <Link href={"/"}>
          <p className="text-3xl font-bold">BlogSite</p>
        </Link>
      </div>
      <NavLinks />
    </div>
  );
};

export default NavBar;
