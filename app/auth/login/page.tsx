"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Form from "@/components/Form";

const formData = {
  title: "Sign In",
  cta: "Register",
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

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    message: "",
    error: "",
  });
  const handleFormSubmit = async (inputs: any) => {
    console.log(inputs);
    // Handle form submission logic here
    const { email, password } = inputs;
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log("response", response);

      const data = await response.json();
      setApiResponse(data);
      console.log("kiss", data);
      if (response.ok) {
        // redirect to home - /
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      formData={formData}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleFormSubmit={handleFormSubmit}
      apiResponse={apiResponse}
    />
  );
};

export default LoginPage;
