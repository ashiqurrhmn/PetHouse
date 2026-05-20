import { Spinner } from "@heroui/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex min-h-[60vh] justify-center items-center py-6 border-[#fb756326] bg-white dark:border-[#fb75634d] dark:bg-[#161616]">
      <Spinner size="xl" className="text-[#fb7563ea]" />
    </div>
  );
}
