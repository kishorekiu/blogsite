import { getDataFromToken } from "@/lib/auth";
import Link from "next/link";
import React from "react";

const page = async () => {
  const username = await getDataFromToken("username");
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-8 mb-4">
      <p>
        User <span>{username}</span>{" "}
      </p>
      <Link
        href={`/profile/${username}`}
        style={{ textDecoration: "underline" }}
        className="underline text-blue-500"
      >
        Explore Your Blogs
      </Link>
    </div>
  );
};

export default page;
