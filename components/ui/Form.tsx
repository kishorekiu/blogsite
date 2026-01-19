"use client";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TertiaryButtonLink from "./TeritioryButtonLink";

export interface FormProps {
  formData: {
    title: string;
    cta: string;
    optionalCta?: {
      label: string;
      href: string;
    };
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

  // Initialize state
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  // Sync state with props
  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    formData.feilds.forEach((field) => {
      if (field.input.defaultValue) {
        initialValues[field.input.name] = field.input.defaultValue;
      }
    });
    setInputs((prev) => ({ ...initialValues, ...prev }));
  }, [formData]);

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
    <div className="flex flex-col items-center justify-center m-3">
      {/* DARK MODE FIX:
         - bg-gray-50 -> dark:bg-gray-900 (Container background)
         - border-gray-200 -> dark:border-gray-700 (Softer border)
      */}
      <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-5 my-5 mx-10 w-full lg:w-[30rem] bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex justify-center mb-2">
          {/* Title Color */}
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            {formData.title}
          </p>
        </div>

        {/* API Messages */}
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

        {formData.feilds.map((feild: FormDataFeilds, index: number) => {
          const { defaultValue, ...inputProps } = feild?.input;

          return (
            <div key={index} className="flex flex-col w-full">
              {/* Label Color: dark:text-gray-200 */}
              <label
                htmlFor={feild?.input?.htmlFor}
                className="font-bold text-gray-700 dark:text-gray-200 mb-1"
              >
                {feild.label}
              </label>

              <div className="relative">
                {/* INPUT STYLES:
                   - bg-white -> dark:bg-gray-800
                   - text-black -> dark:text-white
                   - border-gray-200 -> dark:border-gray-600
                */}
                {feild?.input?.type === "textarea" ? (
                  <textarea
                    {...inputProps}
                    value={inputs?.[feild?.input?.name] || ""}
                    rows={10}
                    onChange={handleOnChange}
                    className="p-2 w-full rounded-xl resize-none border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  />
                ) : (
                  <input
                    {...inputProps}
                    {...(feild?.input?.type === "password" && {
                      type: showPassword ? "text" : "password",
                    })}
                    value={inputs?.[feild?.input?.name] || ""}
                    onChange={handleOnChange}
                    className="p-2 w-full rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  />
                )}

                {/* Toggle Password Icon */}
                {feild?.input?.type === "password" && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword && setShowPassword((prev: any) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                )}

                {/* Error Message */}
                {feild?.input?.name && errors?.[feild?.input?.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors?.[feild?.input?.name]}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={handleOnFormSubmit}
            disabled={isLoading}
            className={`
              border font-bold text-lg rounded-xl py-2 px-6 transition-colors duration-200
              ${
                isLoading
                  ? "cursor-not-allowed opacity-60 bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 border-transparent"
                  : "cursor-pointer hover:text-white hover:bg-blue-400 bg-gray-300 text-gray-700 border-gray-400 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-blue-600"
              }
            `}
          >
            {isLoading ? "Please wait..." : formData.cta}
          </button>
          {/* @ts-ignore */}
          {formData?.optionalCta?.href && (
            <TertiaryButtonLink href={formData?.optionalCta?.href}>
              {formData?.optionalCta?.label}
            </TertiaryButtonLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
