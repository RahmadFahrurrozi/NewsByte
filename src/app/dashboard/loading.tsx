import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDashboard() {
  return (
    <>
      <div className="p-6">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-6" />
      </div>
    </>
  );
}
