import Link from "next/link";
import React from "react";

const SecondaryButtonLink = ({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}) => {
  return (
    <Link
      href={href}
      className="border p-2 px-4 rounded-full transition-colors duration-200 cursor-pointer font-medium
      border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800
      dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
    >
      {children}
    </Link>
  );
};

export default SecondaryButtonLink;
