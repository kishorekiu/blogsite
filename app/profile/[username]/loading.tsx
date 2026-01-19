// import BlogListSkeleton from "@/components/skeletons/BlogSkeleton";
import { BlogListSkeleton } from "@/components/skeletons/BlogSkeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header Skeleton */}
      <div className="mb-8 border-b dark:border-gray-800 pb-4 animate-pulse">
        {/* Username line */}
        <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-md w-1/3 sm:w-1/4 mb-3"></div>
        {/* Blog count line */}
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-1/5 sm:w-1/6"></div>
      </div>

      {/* Blog List Skeleton */}
      <BlogListSkeleton />
    </div>
  );
};

export default Loading;
