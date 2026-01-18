import React from "react";
import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogsProps {
  blogs: any[] | null;
}

const Blogs = (props: BlogsProps) => {
  const { blogs } = props;

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
          Welcome to BlogSite
        </p>
        <SecondaryButton>
          <Link href={"/blogs/create"} className="whitespace-nowrap">
            Create Blog
          </Link>
        </SecondaryButton>
      </div>

      {/* Blogs List */}
      <div className="flex flex-col gap-6 pb-10">
        {blogs?.map((blog, index) => (
          <div
            key={index}
            className="group flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl
              bg-white border-gray-200
              dark:bg-gray-900 dark:border-gray-800"
          >
            {/* Title & Meta */}
            <div>
              <p
                className="text-xl sm:text-2xl font-bold transition-colors
                text-gray-800 group-hover:text-blue-600
                dark:text-gray-100 dark:group-hover:text-blue-400"
              >
                {blog.title}
              </p>

              <div
                className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm mt-2
                text-gray-500
                dark:text-gray-400"
              >
                <p className="flex items-center gap-1">
                  By
                  <span
                    className="font-semibold px-2 py-0.5 rounded-full
                    text-blue-500 bg-blue-50
                    dark:text-blue-300 dark:bg-blue-900/30"
                  >
                    {blog.author.username}
                  </span>
                </p>
                <span className="hidden sm:inline">•</span>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <hr className="my-1 border-gray-100 dark:border-gray-700" />

            {/* Markdown Preview */}
            <div
              className="prose prose-sm max-w-none overflow-hidden relative line-clamp-3 md:line-clamp-4
              prose-slate text-gray-600
              dark:prose-invert dark:text-gray-300"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-xl sm:text-2xl font-bold my-2 text-gray-900 dark:text-white"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-lg sm:text-xl font-semibold my-2 text-gray-800 dark:text-gray-200"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside my-2 pl-2"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-1" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-2 leading-relaxed" {...props} />
                  ),
                }}
              >
                {blog.description}
              </ReactMarkdown>
            </div>

            {/* Mobile "Read More" hint */}
            <p
              className="text-sm font-medium mt-1 group-hover:underline sm:hidden
              text-blue-500
              dark:text-blue-400"
            >
              Read more...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
