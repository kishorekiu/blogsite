import Link from "next/link";

interface BlogTitleSectionProps {
  title: string;
  username: string;
  createdAt: Date;
  blogSlug?: string;
}
const BlogTitleSection = (props: BlogTitleSectionProps) => {
  const { title, username, createdAt, blogSlug } = props;
  return (
    <div>
      <Link
        href={`/blogs/${blogSlug}`}
        title={"Visit Blog"}
        className="text-xl sm:text-2xl font-bold transition-colors
                text-gray-800 group-hover:text-blue-600
                dark:text-gray-100 dark:group-hover:text-blue-400"
      >
        {title}
      </Link>

      <div
        className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm mt-2
                text-gray-500
                dark:text-gray-400"
      >
        <p className="flex items-center gap-1">
          By
          <Link
            href={`/profile/${username}`}
            title={"Visit profile"}
            className="font-semibold px-2 py-0.5 rounded-full
                    text-blue-500 bg-blue-50
                    dark:text-blue-300 dark:bg-blue-900/30"
          >
            {username}
          </Link>
        </p>
        <span className="hidden sm:inline">•</span>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogTitleSection;
