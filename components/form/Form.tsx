"use client";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import FormActions from "./FormActions";

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
  loadingText?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit?: (inputs: any) => void;
  apiResponse?: {
    message?: string;
    error?: string;
  };
  isLoading?: boolean;
}

const Form = (props: FormProps) => {
  const {
    formData,
    showPassword,
    setShowPassword,
    handleFormSubmit,
    isLoading,
    loadingText,
  } = props;

  // Initialize state
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync state with props (Default Values)
  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    formData.feilds.forEach((field) => {
      if (field.input.defaultValue) {
        initialValues[field.input.name] = field.input.defaultValue;
      }
    });
    setInputs((prev) => ({ ...initialValues, ...prev }));
  }, [formData]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOnFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    formData.feilds.forEach((field) => {
      const { input, error } = field;
      if (input && error) {
        if (!input.name) return;

        // Required Check
        if (!inputs?.[input.name]) {
          newErrors[input.name] = error.required;
        }
        // Email Regex Check
        else if (input.type === "email") {
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
      <div className="flex flex-col gap-2 border border-gray-200 dark:border-gray-700 rounded-xl p-5 my-5 mx-10 w-full lg:w-[30rem] bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Title */}
        <div className="flex justify-center mb-2">
          <p className="text-3xl font-bold text-blue-500 dark:text-blue-400">
            {formData.title}
          </p>
        </div>

        {/* API Feedback */}
        {(props?.apiResponse?.message || props?.apiResponse?.error) && (
          <div className="mb-2">
            {props.apiResponse.message && (
              <p className="text-green-500 text-center">
                {props.apiResponse.message}
              </p>
            )}
            {props.apiResponse.error && (
              <p className="text-red-500 text-center">
                {props.apiResponse.error}
              </p>
            )}
          </div>
        )}

        {/* Fields Loop */}
        {formData.feilds.map((field, index) => (
          <FormInput
            key={index}
            field={field}
            value={inputs[field.input.name] || ""}
            error={errors[field.input.name]}
            onChange={handleOnChange}
            showPassword={showPassword}
            onTogglePassword={() =>
              setShowPassword && setShowPassword((prev) => !prev)
            }
          />
        ))}

        {/* Buttons */}
        <FormActions
          isLoading={isLoading}
          ctaLabel={formData.cta}
          onClick={handleOnFormSubmit}
          optionalCta={formData.optionalCta}
          loadingText={loadingText}
        />
      </div>
    </div>
  );
};

export default Form;
