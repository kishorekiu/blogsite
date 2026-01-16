import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";

export const getBlogs = async () => {
  try {
    await dbConnect();
    const blogs: IBlog[] = await Blog.find({})
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .lean();
    return blogs;
  } catch (e) {
    console.log("Internal server error while fetching blogs", e);
    return null;
  }
};
