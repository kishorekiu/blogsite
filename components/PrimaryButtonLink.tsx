import Link from "next/link";
import React from "react";

const PrimaryButtonLink = ({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode;
  href: string;
  disabled: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`
        border border-transparent p-2 px-6 rounded-full w-fit transition-colors duration-200 cursor-pointer font-bold shadow-sm text-white
        ${
          disabled
            ? "opacity-50 cursor-not-allowed bg-gray-400 dark:bg-gray-600"
            : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        }
      `}
    >
      {children}
    </Link>
  );
};

export default PrimaryButtonLink;
