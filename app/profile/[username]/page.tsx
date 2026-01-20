import { notFound } from "next/navigation";
import { getBlogsByUsername } from "@/app/actions/getBlogs";
import Blogs from "@/components/blog/Blogs";
import { getDataFromToken } from "@/lib/auth";
import BackButton from "@/components/ui/BackButton";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { username } = await params;

  // Fetch Data in Parallel
  const [blogs, currentUserId] = await Promise.all([
    getBlogsByUsername(username),
    getDataFromToken(),
  ]);

  if (!blogs) {
    return notFound(); // Shows 404 if user doesn't exist
  }

  // Check if this is "My" profile
  // We can't easily check username vs userId without fetching the user object,
  // but for the UI header "My Blogs" vs "Kishore's Blogs", we can infer context later.

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <BackButton />
      {/* Header */}
      <div className="mt-3 mb-8 border-b dark:border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
          {username}&apos;s Blogs
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {blogs.length} {blogs.length === 1 ? "Blog" : "Blogs"} Published
        </p>
      </div>

      {/* Reusable List Component */}
      {/* Since we pass currentUserId, if I visit my OWN profile,
          the Blogs component will automatically show Edit/Delete buttons. */}
      <Blogs blogs={blogs as any} userId={currentUserId} />
    </div>
  );
};

export default ProfilePage;
