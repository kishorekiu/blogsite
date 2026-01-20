"use client";
import Link from "next/link";

interface BlogTitleSectionProps {
  title: string;
  username: string;
  createdAt: Date | string; // Relaxed type to handle ISO strings
  blogSlug?: string;
  disableTitleLink?: boolean; // New prop to control linking
}

const BlogTitleSection = (props: BlogTitleSectionProps) => {
  const { title, username, createdAt, blogSlug, disableTitleLink } = props;

  // Helper to format date safely
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-1">
      {/* 1. Title Logic:
             If we have a slug AND linking is allowed -> Render Link
             Otherwise -> Render plain text
      */}
      {blogSlug && !disableTitleLink ? (
        <Link
          href={`/blogs/${blogSlug}`}
          className="text-xl sm:text-2xl font-bold transition-colors w-fit
                   text-gray-900 hover:text-blue-600
                   dark:text-gray-100 dark:hover:text-blue-400"
        >
          {title}
        </Link>
      ) : (
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      )}

      {/* 2. Meta Info (Author & Date) */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm mt-1 text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          By
          <Link
            href={`/profile/${username}`}
            // Stop propagation to prevent triggering parent card clicks (if any)
            onClick={(e) => e.stopPropagation()}
            className="font-medium px-2 py-0.5 rounded-full transition-colors
                     text-blue-600 bg-blue-50 hover:bg-blue-100
                     dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
          >
            {username}
          </Link>
        </span>

        <span className="hidden sm:inline text-gray-300 dark:text-gray-600">
          •
        </span>

        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default BlogTitleSection;
