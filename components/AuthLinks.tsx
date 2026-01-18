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
  // Note: isAuth isn't strictly needed here since parent checks it, but okay to keep if logic changes
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const handleSignOut = async () => {
    await deleteSession();
    dispatch(logout());
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="flex gap-4 sm:gap-10 items-center justify-start h-full">
      {/* Sign Out Button */}
      <div
        key={signOut?.name}
        onClick={handleSignOut}
        className="px-4 py-2 rounded-full cursor-pointer border border-transparent transition-all duration-200
          text-gray-600 hover:bg-gray-100 hover:border-gray-300
          dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-600 dark:hover:text-white"
      >
        {signOut?.name}
      </div>

      {/* Profile Button */}
      <div
        className="flex items-center gap-2 border rounded-full py-2 px-4 cursor-pointer transition-all duration-200
        border-gray-300 text-gray-700 hover:bg-gray-100
        dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:border-gray-500"
      >
        <AccountBoxIcon />
        <Link
          className="hidden sm:inline font-medium"
          href={profile?.href || ""}
        >
          {profile?.name}
        </Link>
      </div>
    </div>
  );
};

export default AuthLinks;
