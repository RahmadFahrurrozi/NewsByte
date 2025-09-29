import { CheckCircle, Clock, FileText, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <div className="p-1 rounded-full bg-green-500/15">
          <CheckCircle className="size-4 text-green-500" />
        </div>
      );
    case "pending":
      return (
        <div className="p-1 rounded-full bg-amber-500/15">
          <Clock className="size-4 text-amber-500" />
        </div>
      );
    case "rejected":
      return (
        <div className="p-1 rounded-full bg-red-500/15">
          <XCircle className="size-4 text-red-500" />
        </div>
      );
    default:
      return <FileText className="h-4 w-4" />;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-500/15 text-green-500">Published</Badge>
      );
    case "pending":
      return <Badge className="bg-amber-500/15 text-amber-500">Pending</Badge>;
    case "rejected":
      return <Badge className="bg-red-500/15 text-red-500">Rejected</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};
