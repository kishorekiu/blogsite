import FormSkeleton from "@/components/skeletons/FormSkeleton";
import BackButton from "@/components/ui/BackButton";

const Loading = () => {
  return (
    <div className="mt-8 max-w-4xl mx-auto px-4 sm:px-6">
      <BackButton />
      <FormSkeleton />
    </div>
  );
};

export default Loading;
