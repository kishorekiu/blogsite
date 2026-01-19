const FormSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center m-3 animate-pulse">
      <div className="flex flex-col gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-8 my-5 mx-10 w-full lg:w-[30rem] bg-white dark:bg-gray-900 shadow-sm">
        {/* Title Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/2"></div>
        </div>

        {/* Field Skeletons (Simulate 3 inputs) */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col w-full mb-2">
            {/* Label */}
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
            {/* Input Box */}
            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl w-full border border-gray-200 dark:border-gray-800"></div>
          </div>
        ))}

        {/* Button Actions Skeleton */}
        <div className="mt-6 flex justify-center items-center gap-4">
          {/* Main Button */}
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-1/3"></div>
          {/* Secondary Link */}
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeleton;
