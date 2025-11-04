"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IArticles } from "@/types/IArticles";
import { useApprovalArticle } from "@/hooks/useApprovalArticle";
import { LoadingSpinner } from "../LoadingSpinner";
import { formatDateWithTime } from "@/utils/formatedDate";
import { SafeArticle } from "../SaveArticles";
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  Calendar,
} from "lucide-react";

export interface ArticlePendingProps {
  data: IArticles[] | null;
  error: Error | null;
}

export default function ApprovalAdmin({ data }: ArticlePendingProps) {
  const { isLoading, handleRejectWithReason, handleApprove, isProcessing } =
    useApprovalArticle();

  const getCategoryVariant = (category: string) => {
    const variants: { [key: string]: "default" | "secondary" | "outline" } = {
      technology: "default",
      business: "secondary",
      science: "outline",
      health: "default",
      entertainment: "secondary",
    };
    return variants[category.toLowerCase()] || "outline";
  };

  return (
    <div className="py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Article Approval
          </h1>
          <p className="text-muted-foreground mt-2">
            Review and manage pending articles for publication
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Clock className="w-4 h-4 mr-2" />
          {data?.length || 0} Pending Articles
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Articles</CardTitle>
          <CardDescription>
            Articles waiting for administrative approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="min-w-[200px]">Article</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead
                    className="text-center
                  "
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((article, index) => (
                  <TableRow key={article.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="max-w-[250px]">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              <span className="truncate font-medium">
                                {article.title}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{article.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getCategoryVariant(article.categories)}>
                        {article.categories}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{article.profiles.username}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{formatDateWithTime(article.created_at)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            disabled={isProcessing(article.id)}
                          >
                            {isProcessing(article.id) ? (
                              <LoadingSpinner className="w-4 h-4" />
                            ) : (
                              <>
                                <Eye className="w-4 h-4 mr-2" />
                                Review
                              </>
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-4xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center space-x-2">
                              <FileText className="w-5 h-5" />
                              <span>Article Review</span>
                            </DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-muted-foreground">
                                  Author:
                                </span>
                                <p>{article.profiles.username}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">
                                  Category:
                                </span>
                                <Badge
                                  variant={getCategoryVariant(
                                    article.categories
                                  )}
                                >
                                  {article.categories}
                                </Badge>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">
                                  Submitted:
                                </span>
                                <p>{formatDateWithTime(article.created_at)}</p>
                              </div>
                              <div>
                                <span className="font-medium text-muted-foreground">
                                  Status:
                                </span>
                                <Badge variant="outline" className="ml-2">
                                  Pending Review
                                </Badge>
                              </div>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h3 className="font-semibold mb-2">Title</h3>
                              <p className="text-lg">{article.title}</p>
                            </div>

                            <div className="border rounded-lg">
                              <div className="p-4 border-b">
                                <h3 className="font-semibold">Content</h3>
                              </div>
                              <div className="h-[400px] overflow-y-auto p-4">
                                <SafeArticle
                                  className="tiptap prose max-w-none"
                                  content={article.content}
                                />
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-pointer border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => {
                                handleRejectWithReason(article.id);
                              }}
                              disabled={isLoading && isProcessing(article.id)}
                            >
                              {isLoading && isProcessing(article.id) ? (
                                <>
                                  <LoadingSpinner className="w-4 h-4 mr-2" />
                                  Rejecting...
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                              onClick={() => handleApprove(article.id)}
                              disabled={isLoading && isProcessing(article.id)}
                            >
                              {isLoading && isProcessing(article.id) ? (
                                <>
                                  <LoadingSpinner className="w-4 h-4 mr-2" />
                                  Approving...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </>
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!data?.length && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No pending articles</h3>
              <p className="text-muted-foreground mt-2">
                All articles have been reviewed and processed.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
