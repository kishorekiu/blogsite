const BlogSkeleton = () => {
  return (
    <div className="flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm animate-pulse">
      {/* Title Skeleton */}
      <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-1"></div>

      {/* Meta (Author & Date) Skeleton */}
      <div className="flex gap-4 mt-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>

      <hr className="my-1 border-gray-100 dark:border-gray-700" />

      {/* Description Body Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export const BlogListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Render 3 skeletons to mimic a list */}
      {[1, 2, 3].map((i) => (
        <BlogSkeleton key={i} />
      ))}
    </div>
  );
};

export default BlogListSkeleton;
