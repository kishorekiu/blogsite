import { getDataFromToken } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { NextResponse } from "next/server";

// PUT - Update a blog - dynamic route - blogs/id
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const userId = await getDataFromToken();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { title, description } = await request.json();

    // @ts-ignore
    const blog: IBlog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    // before update blog, make sure blog belongs to loggedIn user
    if (blog.author.toString() !== userId) {
      return NextResponse.json(
        { error: "this Article does not belong to you" },
        { status: 403 }
      );
    }

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    await blog.save();

    return NextResponse.json(
      { message: "blog updated", blog },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error while Updating Blog" },
      { status: 500 }
    );
  }
};
