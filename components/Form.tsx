"use client";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export interface FormProps {
  formData: {
    title: string;
    cta: string;
    feilds: FormDataFeilds[];
  };
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit?: (inputs: any) => void;
  apiResponse?: {
    message?: string;
    error?: string;
  };
  isLoading?: boolean;
}
export interface FormDataFeilds {
  label: string;
  input: {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    htmlFor: string;
    defaultValue?: string;
  };
  error: {
    required: string;
  };
}
const Form = (props: FormProps) => {
  const {
    formData,
    showPassword,
    setShowPassword,
    handleFormSubmit,
    isLoading,
  } = props;
  const [inputs, setInputs] = useState<{ [key: string]: string }>(
    formData?.feilds?.reduce((acc: { [key: string]: string }, feild) => {
      acc[feild.input.name] = feild.input.defaultValue || "";
      return acc;
    }, {}),
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>();
  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleOnFormSubmit = (e: any) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    formData.feilds.forEach((feild) => {
      const { input, error } = feild;
      if (input && error) {
        if (!input.name) {
          return;
        }
        if (!inputs?.[input.name]) {
          newErrors[input.name] = error.required;
        } else if (input.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(inputs[input.name])) {
            newErrors[input.name] = "Please enter a valid email address";
          }
        }
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleFormSubmit && handleFormSubmit(inputs);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 border border-gray-200 rounded-xl p-5 my-5 mx-10 w-120 bg-gray-50">
        <div className="flex justify-center mb-2">
          <p className="text-3xl font-bold text-blue-400">{formData.title}</p>
        </div>
        <div>
          {props?.apiResponse?.message && (
            <p className="text-green-500 text-center">
              {props.apiResponse.message}
            </p>
          )}
          {props?.apiResponse?.error && (
            <p className="text-red-500 text-center">
              {props.apiResponse.error}
            </p>
          )}
        </div>
        {formData.feilds.map((feild: FormDataFeilds, index: number) => (
          <div key={index} className="flex flex-col w-full">
            <label htmlFor={feild?.input?.htmlFor} className="font-bold">
              {feild.label}
            </label>
            <div className="relative">
              {/* input field */}
              {feild?.input?.type === "textarea" ? (
                <textarea
                  {...feild?.input}
                  rows={6}
                  onChange={handleOnChange}
                  className="text-black p-2 w-full border-gray-200 bg-white rounded-xl resize-none"
                />
              ) : (
                <input
                  {...feild?.input}
                  {...(feild?.input?.type === "password" && {
                    type: showPassword ? "text" : "password",
                  })}
                  onChange={handleOnChange}
                  className="text-black p-2 w-full border border-gray-200 bg-white rounded-xl"
                />
              )}
              {/* password show/hide icon */}
              {feild?.input?.type === "password" && (
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword && setShowPassword((prev: any) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              )}
              {/* Error message*/}
              {feild?.input?.name && errors?.[feild?.input?.name] && (
                <p className="text-red-500">{errors?.[feild?.input?.name]}</p>
              )}
            </div>
          </div>
        ))}
        <div className="mt-2 flex justify-center">
          <button
            onClick={handleOnFormSubmit}
            className={`
              border font-bold  text-lggg border-gray-400 rounded-xl py-2 px-3
              ${
                isLoading
                  ? "cursor-not-allowed opacity-60 bg-gray-200 text-gray-400"
                  : "cursor-pointer hover:text-white hover:bg-blue-300 bg-gray-300 text-grey-500"
              }
            `}
          >
            {formData.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
