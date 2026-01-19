import React from "react";
import Blogs from "./Blogs";
import { getBlogs } from "@/app/actions/getBlogs";

const RecentBlogs = async () => {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
};

export default RecentBlogs;
