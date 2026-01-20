import RecentBlogs from "@/components/blog/RecentBlogs";
import BlogListSkeleton from "@/components/skeletons/BlogSkeleton";
import PageSectionHeader from "@/components/ui/PageSectionHeader";
import React, { Suspense } from "react";

const BlogsPage = () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header Section */}
      <PageSectionHeader
        title="Explore Latest Articles"
        description="Dive into stories, tutorials, and insights shared by our community."
        cta={{
          content: "Write a Blog",
          href: "/blogs/create",
        }}
      />

      {/* 2. Blog Feed */}
      <Suspense fallback={<BlogListSkeleton />}>
        <RecentBlogs />
      </Suspense>
    </div>
  );
};

export default BlogsPage;
