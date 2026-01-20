import React from "react";
import TertiaryButtonLink from "../ui/TeritioryButtonLink";

interface FormActionsProps {
  isLoading?: boolean;
  ctaLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  optionalCta?: {
    label: string;
    href: string;
  };
  loadingText?: string;
}

const FormActions = ({
  isLoading,
  ctaLabel,
  onClick,
  optionalCta,
  loadingText,
}: FormActionsProps) => {
  return (
    <div className="mt-4 flex justify-center items-center gap-4">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={`
          border font-bold text-lg rounded-xl py-2 px-6 transition-colors duration-200
          ${
            isLoading
              ? "cursor-not-allowed opacity-60 bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 border-transparent"
              : "cursor-pointer hover:text-white hover:bg-blue-400 bg-gray-300 text-gray-700 border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-blue-600"
          }
        `}
      >
        {isLoading ? loadingText || "Please wait..." : ctaLabel}
      </button>

      {optionalCta?.href && (
        <TertiaryButtonLink href={optionalCta.href}>
          {optionalCta.label}
        </TertiaryButtonLink>
      )}
    </div>
  );
};

export default FormActions;
