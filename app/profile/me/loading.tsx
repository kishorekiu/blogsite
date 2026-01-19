import React from "react";

const Loading = () => {
  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-500"></div>

      {/* Text */}
      <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">
        Redirecting to your profile...
      </p>
    </div>
  );
};

export default Loading;
