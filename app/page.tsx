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
import InfoGrid from "@/components/ui/InfoGrid";

const homeCardsData = [
  {
    title: "Create Content",
    description:
      "Write your thoughts using our powerful markdown editor. Format code, lists, and headings with ease.",
    // icon: <CreateIcon fontSize="large" />,
  },
  {
    title: "Read & Discover",
    description:
      "Explore thousands of articles from a vibrant community of developers and thinkers.",
    // icon: <AutoStoriesIcon fontSize="large" />,
  },
  {
    title: "Share with World",
    description:
      "Publish your portfolio and blogs instantly. Share your unique link and build your online presence.",
    // icon: <ShareIcon fontSize="large" />,
  },
];
const Home = async () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <PageSectionHeader
        title={"Welcome to BlogSite"}
        description={
          "Your place to read, write, and share amazing stories with the world."
        }
        cta={{ content: "Explore Articles", href: "/blogs" }}
      />
      <div className="mt-12">
        <InfoGrid cards={homeCardsData} />
      </div>
    </div>
  );
};

export default Home;
