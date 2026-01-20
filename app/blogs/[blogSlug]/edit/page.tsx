import { getBlogBySlug } from "@/app/actions/getBlogs";
import { getDataFromToken } from "@/lib/auth";
import { notFound } from "next/navigation";
import EditBlogClientWrapper from "./EditBlogClientWrapper";
import BackButton from "@/components/ui/BackButton";
import AiDisclaimer from "@/components/ui/AiDisclaimer";

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
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <BackButton />
      <EditBlogClientWrapper
        formData={editFormData}
        blogId={blog?._id}
        blogSlug={blogSlug}
        userId={userId}
        authorId={blog?.author?._id}
      />
      <div className="mt-2 flex justify-center">
        <AiDisclaimer />
      </div>
    </div>
  );
};

export default EditBlogPage;
