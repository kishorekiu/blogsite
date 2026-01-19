"use client";
import { deleteBlogAction } from "@/app/actions/blogActions";
import { openSnackbar } from "@/lib/features/ui/snackbarSlice";
import { useAppDispatch } from "@/lib/hooks";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteBlogButton = ({ blogId }: { blogId: string }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      // confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone.",
      );
      if (!confirmDelete) return;
      const res = await deleteBlogAction(blogId);
      if (res.error) {
        dispatch(
          openSnackbar({
            message: res.error,
            severity: "error",
          }),
        );
        return;
      }
      if (res.success) {
        dispatch(
          openSnackbar({
            message: "Blog Deleted Successfully",
            severity: "success",
          }),
        );
        // router.push("/");
        router.refresh();
      }
    } catch (e) {
      console.error("error deleting blog", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`
        p-2 rounded-full transition-colors duration-200
        text-red-500 hover:bg-red-50 hover:text-red-700
        dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300
        ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      title="Delete Blog"
    >
      {loading ? (
        <span className="text-xs font-bold">...</span>
      ) : (
        <DeleteOutlineOutlinedIcon />
      )}
    </button>
  );
};

export default DeleteBlogButton;
