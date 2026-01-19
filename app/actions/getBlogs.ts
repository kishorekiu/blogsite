"use server";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { IUser } from "@/models/User";

export const getBlogs = async () => {
  try {
    await dbConnect();
    const blogs: IBlog[] = await Blog.find({})
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean();
    return blogs;
  } catch (e) {
    console.log("Internal server error while fetching blogs", e);
    return null;
  }
};

export const getBlogBySlug = async (slug: any) => {
  try {
    await dbConnect();
    // @ts-ignore
    const blog: IBlog = await Blog.findOne({ slug })
      .populate("author", "username")
      .lean();
    if (!blog) return null;

    return {
      ...blog,
      _id: blog._id.toString(),
      author: {
        ...blog.author,
        _id: (blog.author as IUser)._id.toString(),
      },
      createdAt: blog.createdAt.toString(),
      updatedAt: blog.updatedAt.toString(),
    };
  } catch (e) {
    console.error("Error in getBlogById", e);
    return null;
  }
};
