"use client";

import {
  Table,
  TableBody,
  TableCaption,
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
import { Button } from "@/components/ui/button";
import { IArticles } from "@/types/IArticles";
import { useApprovalArticle } from "@/hooks/useApprovalArticle";
import { LoadingSpinner } from "../LoadingSpinner";
import { formatDateWithTime } from "@/utils/formatedDate";
import { SafeArticle } from "../SaveArticles";

export interface ArticlePendingProps {
  data: IArticles[] | null;
  error: Error | null;
}

export default function ApprovalAdmin({ data }: ArticlePendingProps) {
  const { isLoading, isLoadingRejected, handleApproval, isProcessing } =
    useApprovalArticle();

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Approval Page</h1>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border-r">No</TableHead>
              <TableHead className="border-r">Title</TableHead>
              <TableHead className="border-r">Category</TableHead>
              <TableHead className="border-r">Author</TableHead>
              <TableHead className="border-r">Upload Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((article, index) => (
              <TableRow key={article.id}>
                <TableCell className="border-r">{index + 1}</TableCell>
                <TableCell className="max-w-[250px] border-r">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="truncate">{article.title}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{article.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="border-r">{article.categories}</TableCell>
                <TableCell className="border-r">
                  {article.profiles.username}
                </TableCell>
                <TableCell className="border-r">
                  {formatDateWithTime(article.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
                          disabled={isProcessing(article.id)}
                        >
                          {isProcessing(article.id)
                            ? "Processing..."
                            : "View & Approve"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{article.title}</DialogTitle>
                        </DialogHeader>
                        <div className="h-[450px] overflow-y-auto p-4 border rounded-md my-4">
                          <SafeArticle
                            className="tiptap"
                            content={article.content}
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="cursor-pointer"
                            onClick={() =>
                              handleApproval(article.id, "rejected")
                            }
                            disabled={
                              isLoadingRejected && isProcessing(article.id)
                            }
                          >
                            {isLoadingRejected && isProcessing(article.id) ? (
                              <>
                                <LoadingSpinner />
                                <span>Rejecting...</span>
                              </>
                            ) : (
                              "Reject"
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="cursor-pointer bg-emerald-500 text-white hover:bg-emerald-600"
                            onClick={() =>
                              handleApproval(article.id, "approved")
                            }
                            disabled={isLoading && isProcessing(article.id)}
                          >
                            {isLoading && isProcessing(article.id) ? (
                              <>
                                <LoadingSpinner />
                                <span>Approving...</span>
                              </>
                            ) : (
                              "Approve"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
