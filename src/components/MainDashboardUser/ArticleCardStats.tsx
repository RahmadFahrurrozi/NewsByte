import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface IArticleStatsProps {
  stats: {
    approved: number;
    pending: number;
    rejected: number;
  };
}

export const ArticleCardStats = ({ stats }: IArticleStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-2 rounded-full bg-green-500/20">
              <CheckCircle className="size-4 text-green-600" />
            </div>
            <span className="text-foreground">Published Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground pl-2">
            {stats.approved}
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-500/20">
              <Clock className="size-4 text-amber-600" />
            </div>
            <span className="text-foreground">Pending Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground pl-2">
            {stats.pending}
          </div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <div className="p-2 rounded-full bg-red-500/20">
              <AlertCircle className="size-4 text-red-600" />
            </div>
            <span className="text-foreground">Rejected Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground pl-2">
            {stats.rejected}
          </div>
          <p className="text-xs text-muted-foreground">-3% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};
