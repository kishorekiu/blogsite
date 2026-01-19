"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { revalidatePath, revalidateTag } from "next/cache";
import { getDataFromToken } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "";

const getUserId = async () => {
  try {
    const token = (await cookies()).get("token")?.value || "";
    if (!token) return null;
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (e) {
    console.error("Error in getUserId", e);
    return null;
  }
};

export const createBlogAction = async (data: {
  title: string;
  description: string;
}) => {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { error: "Unauthorized" };
    }
    await dbConnect();

    const { title, description } = data;

    const slug = title.replace(/[ \/]/g, "-");

    const newBlog: IBlog = await Blog.create({
      title,
      description,
      slug,
      author: userId,
    });

    revalidateTag("blogs", "default");
    revalidatePath("/blogs");

    return { success: true, blogId: newBlog?._id?.toString() };
  } catch (e: any) {
    console.error("Error in createBlog", e);
    return { error: e.message || "Error Creating Blog" };
  }
};

export const updateBlogAction = async (
  blogId: string,
  blog: {
    title: string;
    description: string;
  },
) => {
  try {
    const userId = await getUserId();
    if (!userId) return { error: "Unauthorized" };
    await dbConnect();
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId, author: userId },
      {
        title: blog.title,
        description: blog.description,
        slug: blog.title.replace(/[ \/]/g, "-"),
      },
      { new: true },
    );
    if (!updatedBlog)
      return { error: "Blog not found or Unauthorized to edit this blog" };
    revalidateTag("blogs", "default");
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${updatedBlog.slug}`);
    return { success: true, message: "Blog Updated" };
  } catch (e: any) {
    console.error("Error in updateBlog", e);
    return { error: e.message || "Error Updating Blog" };
  }
};

export const deleteBlogAction = async (blogId: string) => {
  try {
    const userId = await getDataFromToken();
    if (!userId) return { error: "Unauthorized" };

    await dbConnect();
    const deletedBlog = await Blog.findOneAndDelete({
      _id: blogId,
      author: userId,
    });
    if (!deletedBlog)
      return { error: "Blog not found or Unauthorized to delete this blog" };
    revalidateTag("blogs", "default");
    revalidatePath("/");
    return { success: true, message: "Blog Deleted" };
  } catch (e: any) {
    console.error("Error deleting blog", e);
    return { error: e.message || "Error deleting blog" };
  }
};
