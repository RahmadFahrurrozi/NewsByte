import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingProfilePageSkeleton() {
  return (
    <div className="px-4 pb-6 sm:px-6 lg:px-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col gap-2 mb-6">
        <Skeleton className="h-8 w-48 rounded-md" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      {/* Account Info Card Skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-2 rounded-md" />
          <Skeleton className="h-4 w-60 rounded-md" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Main form skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile photo skeleton */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-20 rounded-md" />
              </div>
              <Skeleton className="h-3 w-48 rounded-md" />
            </div>
          </CardContent>
        </Card>

        {/* Profile info skeleton */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />

            {/* Social links */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                  ))}
              </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-4">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
