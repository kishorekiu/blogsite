import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogDescriptionProps {
  description: string;
  slug: string;
  isFullView?: boolean; // New Prop: Are we on the single page?
}

const BlogDescription = ({
  description,
  slug,
  isFullView = false,
}: BlogDescriptionProps) => {
  // 1. Check if content is short (e.g., less than 150 chars)
  const isShortContent = description.length < 150;

  // 2. Decide if we should show the "Read More" overlay
  // We show it ONLY if: We are NOT in full view AND content is NOT short
  const showReadMore = !isFullView && !isShortContent;

  return (
    <div className="relative">
      <div
        className={`
          prose prose-sm max-w-none prose-slate text-gray-600 dark:prose-invert dark:text-gray-300
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          dark:prose-a:text-blue-400 dark:hover:prose-a:text-blue-300
          ${
            // If it's Full View OR Short Content, show everything (no height limit)
            isFullView || isShortContent ? "" : "overflow-hidden max-h-50 mb-2"
          }
        `}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // ... your existing components ...
            h1: ({ node, ...props }) => (
              <h1 className="text-xl font-bold" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-2" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          }}
        >
          {description}
        </ReactMarkdown>
      </div>

      {/* 3. Render Overlay ONLY if needed */}
      {showReadMore && (
        <div
          className="absolute bottom-0 left-0 w-full h-24 flex items-end justify-start
            bg-linear-to-t from-white via-white/90 to-transparent
            dark:from-gray-900 dark:via-gray-900/90 dark:to-transparent"
        >
          <Link
            href={`/blogs/${slug}`}
            className="text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline cursor-pointer flex items-center gap-1 pb-1"
          >
            Read more <span className="text-lg">→</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogDescription;
