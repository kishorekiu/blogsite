import { IBlog } from "@/models/Blog";
import SignleBlog from "./SignleBlog";

interface BlogsProps {
  blogs: IBlog[] | null;
  userId?: string;
}

const Blogs = (props: BlogsProps) => {
  const { blogs, userId } = props;

  return (
    <div className="flex flex-col gap-6 pb-10">
      {blogs?.map((blog, index) => (
        <SignleBlog blog={blog} userId={userId} key={index} />
      ))}
    </div>
  );
};

export default Blogs;
