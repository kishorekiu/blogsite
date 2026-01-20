import { getBlogBySlug } from "@/app/actions/getBlogs";
import SignleBlog from "@/components/blog/SignleBlog";
import BackButton from "@/components/ui/BackButton";
import { getDataFromToken } from "@/lib/auth";
import { IUser } from "@/models/User";
import Link from "next/link";
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
      <BackButton />
      <div className="m-3 mx-0">
        <SignleBlog blog={blog as any} userId={userId} />
      </div>
      {(blog?.author as any)?.username && (
        <div className="mt-8 px-4">
          <p>
            Explore more blogs by{" "}
            <Link
              href={`/profile/${(blog?.author as any)?.username}`}
              title={"Visit profile"}
              className="font-semibold px-2 py-0.5 rounded-full
                    text-blue-500 bg-blue-50
                    dark:text-blue-300 dark:bg-blue-900/30"
            >
              {(blog?.author as any)?.username}
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
