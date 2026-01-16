import React from "react";

const SecondaryButton = ({ children }: { children: any }) => {
  return (
    <button className="border p-2 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-600 cursor-pointer">
      {children}
    </button>
  );
};

export default SecondaryButton;
