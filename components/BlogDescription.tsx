import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDescription = ({ description }: { description: string }) => {
  return (
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
            <ul className="list-disc list-inside my-2 pl-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="ml-1" {...props} />,
          p: ({ node, ...props }) => (
            <p className="mb-2 leading-relaxed" {...props} />
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export default BlogDescription;
