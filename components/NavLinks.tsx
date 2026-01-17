"use client";
import { useAppSelector } from "@/lib/hooks";
import AuthLinks from "./AuthLinks";
import UnAuthLinks from "./UnAuthLinks";

const navLinks = {
  unauth: [
    { name: "Sign In", href: "/auth/login" },
    { name: "Sign Up", href: "/auth/register" },
  ],
  signOut: { name: "Sign Out", href: "/" },
  profile: { name: "Profile", href: "/auth/profile" },
};

const NavLinks = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return (
    <div>
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
