import SecondaryButton from "@/components/ui/SecondaryButtonLink";
import { getBlogs } from "./actions/getBlogs";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Blogs from "@/components/blog/Blogs";
import PageSectionHeader from "@/components/ui/PageSectionHeader";
import { Suspense } from "react";
import BlogListSkeleton from "@/components/skeletons/BlogSkeleton";
import RecentBlogs from "@/components/blog/RecentBlogs";

const Home = async () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <PageSectionHeader
        title={"Welcome to BlogSite"}
        cta={{ content: "Create Blog", href: "/blogs/create" }}
      />
      <Suspense fallback={<BlogListSkeleton />}>
        <RecentBlogs />
      </Suspense>
    </div>
  );
};

export default Home;
