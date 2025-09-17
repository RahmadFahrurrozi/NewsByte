"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Calendar } from "lucide-react";
import { IoAnalyticsSharp, IoDocumentTextOutline } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import { formatDateWithTime } from "@/utils/formatedDate";
import { IArticles } from "@/types/IArticles";

interface ArticleStatsProps {
  total?: number;
  stats: {
    approved: number;
    pending: number;
    rejected: number;
  };
  latestUpdatedArticle?: IArticles;
}

export default function ArticleStats({
  total = 0,
  stats,
  latestUpdatedArticle,
}: ArticleStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IoAnalyticsSharp className="w-5 h-5" />
          Article Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total article:</span>
          <span>{total}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-2">
            Published
            <CheckCircle2 className="text-green-500 size-4" />
          </span>
          <span className="font-medium">{stats.approved}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-2">
            Pending
            <IoDocumentTextOutline className="size-4 text-orange-300" />
          </span>
          <span className="font-medium">{stats.pending}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground flex items-center gap-2">
            Rejected
            <BiErrorAlt className="size-4 text-red-500" />
          </span>
          <span className="font-medium">{stats.rejected}</span>
        </div>
        <div className="pt-2 border-t">
          <div className="flex items-center">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="size-4" /> <p>Last Updated:</p>
              <p>
                {latestUpdatedArticle
                  ? formatDateWithTime(latestUpdatedArticle.updated_at)
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
