import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export interface FormProps {
  formData: {
    title: string;
    cta: string;
    feilds: FormDatFeilds[];
  };
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
  handleFormSubmit: (inputs: any) => void;
}
export interface FormDatFeilds {
  type: string;
  label: string;
  name: string;
  id: string;
  placeholder: string;
  htmlFor: string;
}
const Form = (props: FormProps) => {
  const { formData, showPassword, setShowPassword, handleFormSubmit } = props;
  const [inputs, setInputs] = useState({});
  const handleOnChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 border border-gray-200 rounded-xl p-5 my-5 mx-10 w-120 bg-gray-50">
        <div className="flex justify-center mb-2">
          <p className="text-3xl font-bold text-blue-400">{formData.title}</p>
        </div>
        {formData.feilds.map((feild: FormDatFeilds, index: number) => (
          <div key={index} className="flex flex-col w-full">
            <label htmlFor={feild.htmlFor} className="font-bold">
              {feild.label}
            </label>
            <div className="relative">
              <input
                {...feild}
                {...(feild.type === "password" && {
                  type: showPassword ? "text" : "password",
                })}
                onChange={handleOnChange}
                className="text-black p-2 w-full border border-gray-200 bg-white rounded-xl"
              />
              {feild.type === "password" && (
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
            </div>
          </div>
        ))}
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => handleFormSubmit(inputs)}
            className="border font-bold hover:text-white text-lggg border-gray-400 rounded-xl py-2 px-3 cursor-pointer hover:bg-blue-300 bg-gray-300 text-grey-500"
          >
            {formData.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
