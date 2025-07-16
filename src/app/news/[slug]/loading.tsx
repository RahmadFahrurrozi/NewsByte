import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-pulse">
      <Skeleton className="h-8 w-2/3 rounded-full mb-4"></Skeleton>
      <Skeleton className="h-4 w-1/3 rounded-full mb-6"></Skeleton>
      <Skeleton className="aspect-video rounded-xl mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-4 rounded-full w-full"></Skeleton>
        <Skeleton className="h-4 rounded-full w-5/6"></Skeleton>
      </div>
    </div>
  );
}
