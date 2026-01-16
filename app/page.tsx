import SecondaryButton from "@/components/SecondaryButton";
import { getBlogs } from "./actions/getBlogs";
import Link from "next/link";

const Home = async () => {
  const blogs = await getBlogs();
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center gap-2">
        <p>Welcome to BlogSite</p>
        <SecondaryButton>
          <Link href={"/blogs/create"}>Create Blog</Link>
        </SecondaryButton>
      </div>
      <div className="mt-2">
        {blogs?.map((blog, index) => (
          <div
            key={index}
            className="flex border flex-col p-3 gap-2 rounded-2xl border-gray-300 bg-gray-50"
          >
            <p className="text-3xl font-bold">{blog.title}</p>
            <p>{blog.description}</p>
            <p>author: {blog.author.username}</p>
            <p>Created At: {blog.createdAt.toLocaleDateString()}</p>
            <p>Updated At: {blog.updatedAt.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
