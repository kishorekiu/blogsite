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
    <div className="mt-4">
      <div className="flex justify-between items-center gap-2">
        <p className="text-xl font-bold ">Welcome to BlogSite</p>
        <SecondaryButton>
          <Link href={"/blogs/create"}>Create Blog</Link>
        </SecondaryButton>
      </div>
      <div className="mt-6 flex flex-col gap-6">
        {blogs?.map((blog, index) => (
          <div
            key={index}
            className="flex border flex-col p-5 gap-4 rounded-2xl border-gray-300 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div>
              <p className="text-3xl font-bold text-gray-800">{blog.title}</p>
              <div className="flex gap-4 text-sm text-gray-500 mt-1">
                <p>
                  By &nbsp;
                  <span className="font-semibold text-blue-400">
                    {blog.author.username}
                  </span>
                </p>
                <p>•</p>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="prose prose-sm prose-slate max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Map <h1> to tailwind classes
                  h1: ({ node, ...props }) => (
                    <h1 className="text-3xl font-bold my-4" {...props} />
                  ),
                  // Map <h2> to tailwind classes
                  h2: ({ node, ...props }) => (
                    <h2 className="text-2xl font-semibold my-3" {...props} />
                  ),
                  // Map <ul> (unordered list)
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside my-4" {...props} />
                  ),
                  // Map <li> (list item)
                  li: ({ node, ...props }) => (
                    <li className="ml-4" {...props} />
                  ),
                  // Map <p> (paragraph)
                  p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                }}
              >
                {blog.description}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
