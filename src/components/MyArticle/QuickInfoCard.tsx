import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { IoAnalyticsSharp, IoDocumentOutline } from "react-icons/io5";
import { ArrowRight } from "lucide-react";

interface QuickInfoCardProps {
  stats: {
    pending: number;
  };
}

export default function QuickInfoCard({ stats }: QuickInfoCardProps) {
  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <IoDocumentOutline className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="font-semibold">Unpublished Article</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {stats.pending} unpublished Article waiting for review
          </p>
          <Button variant="link" className="p-0 h-auto cursor-pointer">
            View all articles <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <IoAnalyticsSharp className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-semibold">Analytics Overview</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Track performance and engagement metrics
          </p>
          <Button variant="link" className="p-0 h-auto cursor-pointer">
            View analytics <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
