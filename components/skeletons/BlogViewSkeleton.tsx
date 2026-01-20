import React from "react";

const BlogViewSkeleton = () => {
  return (
    <div className="p-5 animate-pulse flex flex-col gap-4 w-full">
      {/* 1. Header Section (Title Left, Buttons Right) */}
      <div className="flex justify-between items-start gap-4">
        <div className="w-full">
          {/* Title Placeholder */}
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 mb-3"></div>

          {/* Meta (Author badge + Date) */}
          <div className="flex items-center gap-3">
            {/* Author Badge */}
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            {/* Dot */}
            <div className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            {/* Date */}
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Action Buttons Placeholder (Edit/Delete)
            We show them vaguely so the layout doesn't jump if they load in.
        */}
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>

      {/* 2. Divider */}
      <hr className="border-gray-200 dark:border-gray-800 my-1" />

      {/* 3. Content Body (Simulating Markdown) */}
      <div className="space-y-3 mt-2">
        {/* Paragraph 1 */}
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>

        {/* Heading Simulation */}
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mt-6 mb-2"></div>

        {/* Paragraph 2 */}
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-10/12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>

        {/* Big Block (Image or Code Block simulation) */}
        <div className="h-48 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  );
};

export default BlogViewSkeleton;
