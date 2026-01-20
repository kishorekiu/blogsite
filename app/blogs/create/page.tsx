"use client";
import { checkContentSafetyAction } from "@/app/actions/aiActions";
import { createBlogAction } from "@/app/actions/blogActions";
import Form from "@/components/form/Form";
import AiDisclaimer from "@/components/ui/AiDisclaimer";
import BackButton from "@/components/ui/BackButton";
import {
  BlogDraft,
  clearTempBlog,
  saveTemBlog,
} from "@/lib/features/blog/blogSlice";
import { openSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const tempBlogData = useAppSelector((state) => state?.blog?.tempBlogData);
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Please wait...");
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
    setLoadingText("AI Agent is Analyzing content...");
    try {
      const safetyCheck = await checkContentSafetyAction(
        inputs.title,
        inputs.description,
      );
      console.log("AI Agent response handleCreateBlog: ", safetyCheck);

      if (safetyCheck.success && safetyCheck.analysis.isSafe === false) {
        dispatch(
          openSnackbar({
            message: `Blocked: ${safetyCheck.analysis.reason}`,
            severity: "error",
          }),
        );
        setLoading(false);
        return;
      }
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
        setLoadingText("Safe! Saving to Database...");
        // trigger Snackbar
        dispatch(
          openSnackbar({
            message: "Blog Published Successfully",
            severity: "success",
          }),
        );
        // clear any saved draft blog
        dispatch(clearTempBlog());
        router.push("/blogs");
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
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <BackButton />
      <Form
        formData={formData}
        handleFormSubmit={handleCreateBlog}
        isLoading={loading}
        loadingText={loadingText}
      />
      <div className="mt-2 flex justify-center">
        <AiDisclaimer />
      </div>
    </div>
  );
};

export default page;
