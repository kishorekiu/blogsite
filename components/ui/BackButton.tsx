"use client";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 group cursor-pointer"
    >
      <div className="p-1 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-200">
        <ArrowBack fontSize="small" />
      </div>
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;
