"use client";
import { updateBlogAction } from "@/app/actions/blogActions";
import Form, { FormDataFeilds } from "@/components/Form";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface EditBlogClientWrapperProps {
  formData: {
    title: string;
    cta: string;
    feilds: FormDataFeilds[];
  };
  blogId: string;
  isValidAuthorToAccess?: boolean;
}
const EditBlogClientWrapper = (props: EditBlogClientWrapperProps) => {
  const { blogId, formData, isValidAuthorToAccess } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    error: "",
  });
  const handleSubmit = async (inputs: any) => {
    setLoading(true);
    try {
      const res = await updateBlogAction(blogId, inputs);
      // @ts-ignore
      setApiResponse(res);
      if (res.success) {
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
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      {isValidAuthorToAccess && (
        <div className="mt-5 flex justify-center">
          <p className="text-red-500">
            You are not the author of this blog. You can't edit it.
          </p>
        </div>
      )}
      <Form
        formData={formData}
        handleFormSubmit={handleSubmit}
        isLoading={loading}
        apiResponse={apiResponse}
      />
    </div>
  );
};

export default EditBlogClientWrapper;
