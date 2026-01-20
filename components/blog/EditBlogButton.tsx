import { EditOutlined } from "@mui/icons-material";
import Link from "next/link";

const EditBlogButton = ({ blogSlug }: { blogSlug: string }) => {
  return (
    <Link
      href={`/blogs/${blogSlug}/edit`}
      title="Edit Blog"
      className="
        p-2 rounded-full transition-colors duration-200
        text-blue-500 hover:bg-blue-50 hover:text-blue-700
        dark:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-300
        cursor-pointer flex items-center gap-1 justify-center
      "
    >
      <EditOutlined />
    </Link>
  );
};

export default EditBlogButton;
