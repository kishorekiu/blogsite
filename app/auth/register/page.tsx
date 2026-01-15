"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Form from "@/components/Form";

const formData = {
  title: "Sign Up",
  cta: "Register",
  feilds: [
    {
      type: "text",
      label: "Username",
      name: "username",
      id: "username",
      placeholder: "Enter username",
      htmlFor: "username",
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      id: "email",
      placeholder: "Enter email",
      htmlFor: "email",
    },
    {
      type: "password",
      label: "Password",
      name: "password",
      id: "password",
      placeholder: "Enter password",
      htmlFor: "password",
    },
  ],
};

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = async (inputs: any) => {
    console.log(inputs);
    // Handle form submission logic here
    const { username, email, password } = inputs;
    if (!username || !email || !password) {
      // handle error handling
      console.log("full data not entered");
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
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
    />
  );
};

export default page;
