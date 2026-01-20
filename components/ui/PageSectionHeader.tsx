import React from "react";
import SecondaryButton from "./SecondaryButtonLink";
import Link from "next/link";
import SecondaryButtonLink from "./SecondaryButtonLink";
interface PageSectionHeaderProps {
  title: string;
  description: string;
  cta: {
    content: string;
    href: string;
  };
}
const PageSectionHeader = (props: PageSectionHeaderProps) => {
  const { title, description, cta } = props;
  return (
    <div className="flex flex-col justify-between items-start sm:items-center gap-4 mb-6">
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
        {title}
      </p>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
      <SecondaryButtonLink href={cta?.href}>{cta?.content}</SecondaryButtonLink>
    </div>
  );
};

export default PageSectionHeader;
