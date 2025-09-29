import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleListDashboardSkeleton() {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Skeleton className="h-6 w-24 mb-2" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Skeleton className="h-9 w-full sm:w-64" />
            <div className="flex gap-2 flex-col w-full sm:flex-row sm:w-auto">
              <Skeleton className="h-9 w-full sm:w-20" />
              <Skeleton className="h-9 w-full sm:w-28" />
              <Skeleton className="h-9 w-full sm:w-32" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex items-start gap-4 w-full">
                <Skeleton className="h-4 w-4 mt-1" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
              <Skeleton className="h-8 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
