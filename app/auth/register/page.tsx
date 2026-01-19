"use client";
import { useState } from "react";
import Form from "@/components/ui/Form";
import { useRouter } from "next/navigation";

const formData = {
  title: "Sign Up",
  cta: "Sign Up",
  optionalCta: {
    label: "return user? Sign In",
    href: "/auth/login",
  },
  feilds: [
    {
      label: "Username",
      input: {
        type: "text",
        name: "username",
        id: "username",
        placeholder: "Enter username",
        htmlFor: "username",
      },
      error: {
        required: "Username is required",
      },
    },
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

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    error: "",
  });
  const handleFormSubmit = async (inputs: any) => {
    setLoading(true);
    const { username, email, password } = inputs;
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log("response", response);

      const data = await response.json();
      setApiResponse(data);
      console.log("kiss", data);
      if (response.ok) {
        router.push("/auth/login");
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

export default RegisterPage;
