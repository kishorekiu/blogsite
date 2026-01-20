import Link from "next/link";
import { IBlog } from "@/models/Blog";
import { IUser } from "@/models/User";
import BlogTitleSection from "./BlogTitleSection";
import BlogDescription from "./BlogDescription";
import PrimaryButtonLink from "../ui/PrimaryButtonLink";
import DeleteBlogButton from "./DeleteBlogButton";

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
          createdAt={blog?.createdAt}
        />
      ) : (
        // If Card View, make it clickable
        <BlogTitleSection
          title={blog.title}
          username={(blog.author as IUser)?.username}
          createdAt={blog.createdAt}
          blogSlug={blog.slug}
          disableTitleLink={isFullView} // Disable link if we are already on the full page
        />
      )}

      <hr className="my-1 border-gray-100 dark:border-gray-700" />

      {/* 2. Pass isFullView down to description */}
      <BlogDescription
        description={blog.description}
        slug={blog.slug}
        isFullView={isFullView}
      />

      {/* 3. Actions (Only for Author) */}
      {isAuthor && (
        <>
          <hr className="my-1 border-gray-100 dark:border-gray-700" />
          <div className="flex justify-end gap-2">
            <PrimaryButtonLink
              href={`/blogs/${blog.slug}/edit`}
              disabled={false}
            >
              Edit Blog
            </PrimaryButtonLink>
            <DeleteBlogButton blogId={blog?._id?.toString()} />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlog;
