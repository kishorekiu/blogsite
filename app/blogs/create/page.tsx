"use client";
import { createBlogAction } from "@/app/actions/blogActions";
import Form from "@/components/form/Form";
import {
  BlogDraft,
  clearTempBlog,
  saveTemBlog,
} from "@/lib/features/blog/blogSlice";
import { openSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const page = () => {
  const tempBlogData = useAppSelector((state) => state?.blog?.tempBlogData);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<{
    title: string;
    description: string;
  }>();
  useEffect(() => {
    if (tempBlogData) {
      setInitialValues(tempBlogData);
    }
  }, [tempBlogData]);
  useEffect(() => {
    if (!isAuth) {
      dispatch(
        openSnackbar({
          message: "You must be logged in to create a blog",
          severity: "warning",
        }),
      );
    }
  }, [isAuth]);
  const handleCreateBlog = async (inputs: BlogDraft) => {
    setLoading(true);
    try {
      const result = await createBlogAction(inputs);
      // check Unauthorized
      if (result.error) {
        // trigger Snackbar
        dispatch(
          openSnackbar({
            message: "Session Expired, Please Login",
            severity: "error",
          }),
        );
        // save entered blog data to store
        dispatch(
          saveTemBlog({ title: inputs.title, description: inputs.description }),
        );
        // redirect to /auth/login with "form" query param
        router.push("/auth/login?from=/blogs/create");
        return;
      }
      if (result.success) {
        // trigger Snackbar
        dispatch(
          openSnackbar({
            message: "Blog Published Successfully",
            severity: "success",
          }),
        );
        // clear any saved draft blog
        dispatch(clearTempBlog());
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  const formData = {
    title: "Create a New Blog",
    cta: "Publish Blog",
    feilds: [
      {
        label: "Blog Title",
        input: {
          type: "text",
          name: "title",
          id: "title",
          placeholder: "Enter an engaging title...",
          htmlFor: "title",
          defaultValue: initialValues?.title || "",
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
          defaultValue: initialValues?.description || "",
        },
        error: {
          required: "Content is required",
        },
      },
    ],
  };
  return (
    <Form
      formData={formData}
      handleFormSubmit={handleCreateBlog}
      isLoading={loading}
    />
  );
};

export default page;
