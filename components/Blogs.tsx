import BlogTitleSection from "./BlogTitleSection";
import BlogDescription from "./BlogDescription";
import PrimaryButton from "./PrimaryButtonLink";
import Link from "next/link";
import PrimaryButtonLink from "./PrimaryButtonLink";

interface BlogsProps {
  blogs: any[] | null;
}

const Blogs = (props: BlogsProps) => {
  const { blogs } = props;

  return (
    <div className="flex flex-col gap-6 pb-10">
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className="group flex flex-col p-5 sm:p-6 gap-3 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl
              bg-white border-gray-200
              dark:bg-gray-900 dark:border-gray-800"
        >
          {/* Title & Meta */}
          <BlogTitleSection
            title={blog.title}
            username={blog.author.username}
            createdAt={blog.createdAt}
          />
          <hr className="my-1 border-gray-100 dark:border-gray-700" />
          {/* Markdown Preview */}
          <BlogDescription description={blog.description} />
          {/* Mobile "Read More" hint */}
          <p
            className="text-sm font-medium mt-1 group-hover:underline sm:hidden
              text-blue-500
              dark:text-blue-400"
          >
            Read more...
          </p>
          <hr className="my-1 border-gray-100 dark:border-gray-700" />
          <PrimaryButtonLink href={`/blogs/edit/${blog.slug}`} disabled={false}>
            Edit Blog
          </PrimaryButtonLink>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
