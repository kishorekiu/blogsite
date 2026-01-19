import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormDataFeilds } from "./Form";

interface FormInputProps {
  field: FormDataFeilds;
  value: string;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

const FormInput = ({
  field,
  value,
  error,
  onChange,
  showPassword,
  onTogglePassword,
}: FormInputProps) => {
  const { defaultValue, ...inputProps } = field.input;

  return (
    <div className="flex flex-col w-full mb-4">
      <label
        htmlFor={field.input.htmlFor}
        className="font-bold text-gray-700 dark:text-gray-200 mb-1"
      >
        {field.label}
      </label>

      <div className="relative">
        {field.input.type === "textarea" ? (
          <textarea
            {...inputProps}
            value={value}
            rows={10}
            onChange={onChange}
            className="p-2 w-full rounded-xl resize-none border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 transition-colors"
          />
        ) : (
          <input
            {...inputProps}
            type={
              field.input.type === "password" && showPassword
                ? "text"
                : field.input.type
            }
            value={value}
            onChange={onChange}
            className="p-2 w-full rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 transition-colors"
          />
        )}

        {/* Toggle Password Icon */}
        {field.input.type === "password" && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default FormInput;
