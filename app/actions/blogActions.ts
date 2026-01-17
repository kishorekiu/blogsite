"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { revalidatePath } from "next/cache";

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

export const createBlog = async (data: {
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

    const slug =
      title.replace(/ /g, "-") + "-" + new Date().toLocaleDateString();

    const newBlog: IBlog = await Blog.create({
      title,
      description,
      slug,
      author: userId,
    });

    revalidatePath("/blogs");

    return { success: true, blogId: newBlog?._id?.toString() };
  } catch (e: any) {
    console.error("Error in createBlog", e);
    return { error: e.message || "Error Creating Blog" };
  }
};
