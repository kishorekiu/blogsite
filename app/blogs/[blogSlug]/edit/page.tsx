import { getBlogBySlug } from "@/app/actions/getBlogs";
import { getDataFromToken } from "@/lib/auth";
import { notFound } from "next/navigation";
import EditBlogClientWrapper from "./EditBlogClientWrapper";

const EditBlogPage = async ({
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
  const editFormData = {
    title: "Edit Blog",
    cta: "Update Blog",
    feilds: [
      {
        label: "Blog Title",
        input: {
          type: "text",
          name: "title",
          id: "title",
          placeholder: "Enter an engaging title...",
          htmlFor: "title",
          defaultValue: blog?.title || "",
        },
        error: {
          required: "Title is required",
        },
      },
      {
        label: "Content (Markdown)",
        input: {
          type: "textarea",
          name: "description",
          id: "description",
          placeholder: "Write your content here... (Supports Markdown)",
          htmlFor: "password",
          defaultValue: blog?.description || "",
        },
        error: {
          required: "Content is required",
        },
      },
    ],
  };
  return (
    <EditBlogClientWrapper
      formData={editFormData}
      blogId={blog?._id}
      blogSlug={blogSlug}
      userId={userId}
      authorId={blog?.author?._id}
    />
  );
};

export default EditBlogPage;
