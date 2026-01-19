"use client";
import { updateBlogAction } from "@/app/actions/blogActions";
import Form, { FormDataFeilds } from "@/components/ui/Form";
import { openSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EditBlogClientWrapperProps {
  formData: {
    title: string;
    cta: string;
    feilds: FormDataFeilds[];
  };
  blogId: string;
  blogSlug?: string;
  userId?: string;
  authorId?: string;
}
const EditBlogClientWrapper = (props: EditBlogClientWrapperProps) => {
  const { blogId, formData, blogSlug, userId, authorId } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    error: "",
  });
  useEffect(() => {
    if (!userId) {
      dispatch(
        openSnackbar({
          message:
            "Redirected to Login Page, You must be logged in to edit a blog",
          severity: "error",
        }),
      );
      router.push(`/auth/login?from=/blogs/${blogSlug}/edit`);
    } else if (authorId !== userId) {
      dispatch(
        openSnackbar({
          message: "You are not the author of this blog. You can't edit it.",
          severity: "error",
        }),
      );
    }
  }, [userId, authorId]);
  const handleSubmit = async (inputs: any) => {
    setLoading(true);
    try {
      const res = await updateBlogAction(blogId, inputs);
      // @ts-ignore
      setApiResponse(res);
      if (res.error) {
        dispatch(
          openSnackbar({
            message: res.error,
            severity: "error",
          }),
        );
      }
      if (res.success) {
        dispatch(
          openSnackbar({
            message: "Blog Updated Successfully",
            severity: "success",
          }),
        );
        router.push("/");
        router.refresh();
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      formData={formData}
      handleFormSubmit={handleSubmit}
      isLoading={loading}
      apiResponse={apiResponse}
    />
  );
};

export default EditBlogClientWrapper;
