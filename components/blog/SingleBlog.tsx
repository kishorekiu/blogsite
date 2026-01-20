import { IBlog } from "@/models/Blog";
import { IUser } from "@/models/User";
import BlogTitleSection from "./BlogTitleSection";
import BlogDescription from "./BlogDescription";

interface SingleBlogProps {
  blog: IBlog;
  userId?: string;
  isFullView?: boolean; // New Prop
}

const SingleBlog = (props: SingleBlogProps) => {
  const { blog, userId, isFullView = false } = props;
  const isAuthor = userId === (blog?.author as IUser)?._id?.toString();

  return (
    <div
      className={`
        flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border transition-all duration-300
        bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800
        ${
          // Only show hover effects if it's a Card (Not Full View)
          !isFullView
            ? "shadow-sm hover:shadow-xl hover:-translate-y-1"
            : "shadow-none border-none" // Cleaner look for full page
        }
      `}
    >
      {/* 1. Title Section: Conditional Link */}
      {isFullView ? (
        // If Full View, just show the title (not clickable)
        <BlogTitleSection
          title={blog.title}
          username={(blog?.author as IUser)?.username || "Unknown"}
          blogSlug={blog.slug}
          createdAt={blog?.createdAt}
          blogId={(blog?._id as unknown)?.toString()}
          isAuthor={isAuthor}
          disableTitleLink={true}
        />
      ) : (
        // If Card View, make it clickable
        <BlogTitleSection
          title={blog.title}
          username={(blog.author as IUser)?.username}
          createdAt={blog.createdAt}
          blogSlug={blog.slug}
          disableTitleLink={false} // Disable link if we are already on the full page
          blogId={(blog?._id as unknown)?.toString()}
          isAuthor={isAuthor}
        />
      )}

      <hr className="my-1 border-gray-100 dark:border-gray-700" />

      {/* 2. Pass isFullView down to description */}
      <BlogDescription
        description={blog.description}
        slug={blog.slug}
        isFullView={isFullView}
      />
    </div>
  );
};

export default SingleBlog;
