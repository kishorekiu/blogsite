"use client";
import React, { Suspense, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Form from "@/components/ui/Form";
import { useAppDispatch } from "@/lib/hooks";
import { login } from "@/lib/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";

const formData = {
  title: "Sign In",
  cta: "Sign In",
  optionalCta: {
    label: "new here? Sign Up",
    href: "/auth/register",
  },
  feilds: [
    {
      label: "Email",
      input: {
        type: "email",
        name: "email",
        id: "email",
        placeholder: "Enter email",
        htmlFor: "email",
      },
      error: {
        required: "Email is required",
      },
    },
    {
      label: "Password",
      input: {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Enter password",
        htmlFor: "password",
      },
      error: {
        required: "Password is required",
      },
    },
  ],
};

const LoginContent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    error: "",
  });
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("from") || "/";
  console.log("redirectTarge", redirectTarget);

  const handleFormSubmit = async (inputs: any) => {
    setLoading(true);
    const { email, password } = inputs;
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setApiResponse(data);
      if (response.ok) {
        dispatch(login());
        router.push(redirectTarget);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      formData={formData}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleFormSubmit={handleFormSubmit}
      apiResponse={apiResponse}
      isLoading={loading}
    />
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>loading login...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
