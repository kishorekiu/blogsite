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
        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
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
            className="group flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            {/* Title & Meta */}
            <div>
              <p className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {blog.title}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-2">
                <p className="flex items-center gap-1">
                  By
                  <span className="font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                    {blog.author.username}
                  </span>
                </p>
                <span className="hidden sm:inline">•</span>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <hr className="border-gray-100 my-1" />

            {/* Markdown Preview */}
            {/* FIX: Moved 'line-clamp' classes HERE, to the wrapper div */}
            <div className="prose prose-sm prose-slate max-w-none text-gray-600 overflow-hidden relative line-clamp-3 md:line-clamp-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-xl sm:text-2xl font-bold my-2 text-gray-900"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-lg sm:text-xl font-semibold my-2 text-gray-800"
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
            <p className="text-blue-500 text-sm font-medium mt-1 group-hover:underline sm:hidden">
              Read more...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
