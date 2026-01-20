import React from "react";

export interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const InfoCard = (props: InfoCardProps) => {
  const { title, description, icon } = props;
  return (
    <div
      className="
      flex flex-col gap-3 p-6 border rounded-2xl transition-all duration-300
      bg-white border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200
      dark:bg-gray-900 dark:border-gray-800 dark:hover:border-blue-900/50
    "
    >
      {icon && (
        <div className="mb-2 text-blue-600 dark:text-blue-400">{icon}</div>
      )}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default InfoCard;
