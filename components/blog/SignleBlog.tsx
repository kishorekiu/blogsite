import BlogTitleSection from "./BlogTitleSection";
import BlogDescription from "./BlogDescription";
import PrimaryButtonLink from "../ui/PrimaryButtonLink";
import DeleteBlogButton from "./DeleteBlogButton";
import { IBlog } from "@/models/Blog";
import { IUser } from "@/models/User";

interface SingleBlogProps {
  blog: IBlog;
  userId?: string;
}
const SignleBlog = (props: SingleBlogProps) => {
  const { blog, userId } = props;
  const isAuthor = userId === (blog?.author as IUser)?._id?.toString();
  return (
    <div
      className="group flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border transition-all duration-300 cursor-pointerr hover:-translate-y-1 shadow-sm hover:shadow-xl
              bg-white border-gray-200
              dark:bg-gray-900 dark:border-gray-800"
    >
      {/* Title & Meta */}
      <BlogTitleSection
        title={blog.title}
        username={(blog?.author as IUser)?.username || "Unknown"}
        createdAt={blog?.createdAt}
        blogSlug={blog?.slug}
      />
      <hr className="my-1 border-gray-100 dark:border-gray-700" />
      {/* Markdown Preview */}
      <BlogDescription description={blog.description} />
      {/* Edit Blog Button */}
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

export default SignleBlog;
