import Link from "next/link";
import NavLinks from "./NavLinks";
import { getDataFromToken } from "@/lib/auth";

const NavBar = async () => {
  return (
    <div
      className="sticky top-0 z-50 h-20 px-2 md:px-20 flex justify-between items-center border-b transition-colors duration-300
      bg-white border-b-gray-200
      dark:bg-gray-900 dark:border-b-gray-800"
    >
      <div className="flex items-center justify-start h-full">
        <Link href={"/"}>
          <p className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
            BlogSite
          </p>
        </Link>
      </div>
      <NavLinks />
    </div>
  );
};

export default NavBar;
