import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section>
      {/* Section Header Skeleton */}
      <div className="flex items-center gap-2 mb-3 px-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* News Grid Skeleton */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 px-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

// Komponen Skeleton untuk Artikel
export function ArticleSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-md bg-card">
      {/* Image Skeleton */}
      <Skeleton className="aspect-video w-full rounded-none" />

      {/* Content Skeleton */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Category Badge Skeleton */}
        <div className="mb-3">
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-5 w-4/5 mb-2" />

        {/* Excerpt Skeleton */}
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4 mb-4" />

        {/* Metadata Skeleton */}
        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>

        {/* Read More Button Skeleton */}
        <Skeleton className="h-10 w-full mt-6" />
      </div>
    </div>
  );
}
