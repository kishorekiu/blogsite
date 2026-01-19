import { getBlogBySlug } from "@/app/actions/getBlogs";
import SignleBlog from "@/components/blog/SignleBlog";
import { getDataFromToken } from "@/lib/auth";
import { notFound } from "next/navigation";
import React from "react";

const BlogPage = async ({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) => {
  const { blogSlug } = await params;
  const [blog, userId] = await Promise.all([
    getBlogBySlug(blogSlug),
    getDataFromToken(),
  ]);
  if (!blog) return notFound();
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <SignleBlog blog={blog as any} userId={userId} />
    </div>
  );
};

export default BlogPage;
