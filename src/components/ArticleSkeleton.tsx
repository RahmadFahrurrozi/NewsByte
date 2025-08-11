import { Card, CardContent } from "@/components/ui/card";

export default function ArticleListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="px-6 py-3">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-4 w-40 bg-muted rounded animate-pulse"></div>
                <div className="h-3 w-28 bg-muted rounded animate-pulse"></div>
              </div>
              <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
