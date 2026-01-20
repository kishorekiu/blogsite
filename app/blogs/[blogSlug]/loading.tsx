import BlogViewSkeleton from "@/components/skeletons/BlogViewSkeleton";
import BackButton from "@/components/ui/BackButton";

export default function Loading() {
  return (
    // Matches the container styling of your BlogPage for zero layout shift
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <BackButton />

      <div className="m-3 mx-0">
        {/* Reusing the existing skeleton */}
        <BlogViewSkeleton />
      </div>
    </div>
  );
}
