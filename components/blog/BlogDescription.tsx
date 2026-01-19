import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDescription = ({ description }: { description: string }) => {
  return (
    <div
      className="prose prose-sm max-w-none overflow-hidden relative lline-clamp-3 lmd:line-clamp-4
                  prose-slate text-gray-600
                  dark:prose-invert dark:text-gray-300
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
    dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300"
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
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-600 dark:text-gray-400"
              {...props}
            />
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export default BlogDescription;
