"use client";
import { useAppSelector } from "@/lib/hooks";
import AuthLinks from "./AuthLinks";
import UnAuthLinks from "./UnAuthLinks";

const NavLinks = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const navLinks = {
    unauth: [
      { name: "Sign In", href: "/auth/login" },
      { name: "Sign Up", href: "/auth/register" },
    ],
    signOut: { name: "Sign Out", href: "/" },
    profile: { name: "Profile", href: `/profile/me` },
  };
  return (
    <div className="h-full flex items-center">
      {isAuth ? (
        <AuthLinks
          signOut={navLinks?.["signOut"]}
          profile={navLinks?.["profile"]}
        />
      ) : (
        <UnAuthLinks navLinks={navLinks} />
      )}
    </div>
  );
};

export default NavLinks;
