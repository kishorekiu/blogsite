"use client";
import Link from "next/link";
import React from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { deleteSession } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

interface AuthLinksProps {
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
  const { signOut, profile } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const handleSignOut = async () => {
    await deleteSession();
    dispatch(logout());
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="flex gap-10 items-center justify-start h-full">
      <div
        key={signOut?.name}
        // href={signOut?.href}
        className="hover:bg-gray-200 p-2 rounded-full cursor-pointer hover:border"
        onClick={handleSignOut}
      >
        {signOut?.name}
      </div>
      <div className="flex align-middle border rounded-full py-2 px-3 cursor-pointer hover:bg-gray-200">
        <AccountBoxIcon />
        <Link href={profile?.href || ""}>{profile?.name}</Link>
      </div>
    </div>
  );
};

export default AuthLinks;
