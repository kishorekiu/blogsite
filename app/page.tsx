import SecondaryButton from "@/components/SecondaryButtonLink";
import { getBlogs } from "./actions/getBlogs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Blogs from "@/components/Blogs";
import PageSectionHeader from "@/components/PageSectionHeader";

const Home = async () => {
  const blogs = await getBlogs();
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <PageSectionHeader
        title={"Welcome to BlogSite"}
        cta={{ content: "Create Blog", href: "/blogs/create" }}
      />
      <Blogs blogs={blogs} />;
    </div>
  );
};

export default Home;
