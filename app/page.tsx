import SecondaryButton from "@/components/SecondaryButton";
import { getBlogs } from "./actions/getBlogs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Blogs from "@/components/Blogs";

const Home = async () => {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
};

export default Home;
