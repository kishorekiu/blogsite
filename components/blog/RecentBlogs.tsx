import React from "react";
import Blogs from "./Blogs";
import { getBlogs } from "@/app/actions/getBlogs";
import { getDataFromToken } from "@/lib/auth";

const RecentBlogs = async () => {
  const [blogs, userId] = await Promise.all([getBlogs(), getDataFromToken()]);
  return <Blogs blogs={blogs} userId={userId} />;
};

export default RecentBlogs;
