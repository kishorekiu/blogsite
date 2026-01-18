import { getDataFromToken } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    await dbConnect();
    const blogs: IBlog[] = await Blog.find({})
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    // return NextResponse.json({ message: "Blogs Sent", blogs }, { status: 201 });
    return NextResponse.json(blogs);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error Blogs route" },
      { status: 500 },
    );
  }
};

// Create a Blog route
export const POST = async (request: Request) => {
  try {
    // 1. extract loggedIn userId
    const userId = await getDataFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { title, description } = await request.json();

    const slug = title.replace(/ /g, "-"); // + "-" + new Date().toLocaleDateString();

    const newBlog: IBlog = await Blog.create({
      title,
      description,
      slug,
      author: userId,
    });

    revalidatePath("/blogs");

    return NextResponse.json(newBlog, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Error Creating Blog", e },
      { status: 500 },
    );
  }
};
