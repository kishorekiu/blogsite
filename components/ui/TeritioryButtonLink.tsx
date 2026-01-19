import Link from "next/link";
import React from "react";

const TertiaryButtonLink = ({
  children,
  href,
  disabled,
}: {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}) => {
  // If disabled, render a plain span so it's not clickable
  if (disabled) {
    return (
      <span className="font-bold underline underline-offset-4 text-gray-400 dark:text-gray-600 cursor-not-allowed decoration-gray-400">
        {children}
      </span>
    );
  }

  // If enabled, render the Link
  return (
    <Link
      href={href}
      className="font-bold underline underline-offset-4 w-fit transition-all duration-200 text-blue-600 hover:text-blue-800 decoration-blue-500 hover:decoration-blue-800 dark:text-blue-400 dark:hover:text-blue-300 dark:decoration-blue-400"
    >
      {children}
    </Link>
  );
  // return (
  //   <>
  //     {href && (
  //       <Link
  //         href={disabled ? "" : href} // Prevent navigation if disabled
  //         aria-disabled={disabled}
  //         className={`
  //       font-bold underline underline-offset-4 transition-all duration-200 w-fit
  //       ${
  //         disabled
  //           ? "text-gray-400 dark:text-gray-600 cursor-not-allowed decoration-gray-400"
  //           : "text-blue-600 hover:text-blue-800 decoration-blue-500 hover:decoration-blue-800 dark:text-blue-400 dark:hover:text-blue-300 dark:decoration-blue-400"
  //       }
  //     `}
  //       >
  //         {children}
  //       </Link>
  //     )}
  //   </>
  // );
};

export default TertiaryButtonLink;
