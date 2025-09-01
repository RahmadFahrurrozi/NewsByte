"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Plus,
  Tags,
  Filter,
  ArrowUpDown,
  Calendar,
  FilterIcon,
  Trash2,
  Eye,
  PencilLine,
} from "lucide-react";
import {
  IoAnalyticsSharp,
  IoDocumentOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import PaginationComponent from "@/components/PaginationComponent";
import getBadgeColorStatus from "@/utils/getColorStstus";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useArticleByAuthor } from "@/hooks/useGetArticleByAuthor";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useState } from "react";
import { formatDateWithTime } from "@/utils/formatedDate";
import ArticleListSkeleton from "@/components/ArticleSkeleton";
import { IArticles } from "@/types/IArticles";
import Link from "next/link";
import EmptyArticleAuthor from "@/components/EmptyArticleAuthor";
import useDeleteDialogConfirmation from "@/hooks/useDeleteDialogConfirmation";
import DeleteDialog from "@/components/DeleteDialogConfirmation";

export default function MyarticlesPage() {
  const authorId = useAuth()?.user?.id ?? "";
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: articles,
    isLoading,
    isError,
  } = useArticleByAuthor(authorId, page, perPage);

  const isEmpty = !isLoading && articles?.data && articles.data.length === 0;

  const stats = {
    approved:
      articles?.data?.filter(
        (approved) => approved.article_status === "approved"
      ).length ?? 0,
    pending:
      articles?.data?.filter((pending) => pending.article_status === "pending")
        .length ?? 0,
    rejected:
      articles?.data?.filter(
        (rejected) => rejected.article_status === "rejected"
      ).length ?? 0,
  };

  const {
    isOpenDeleteDialog,
    setIsOpenDeleteDialog,
    openDialog,
    selectedArticle,
    closeDialog,
    confirmDelete,
    isLoadingDelete,
  } = useDeleteDialogConfirmation();

  if (isError) return <div>Error</div>;

  return (
    <section className="py-5 px-6">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        {/* Left area -  ticky */}
        <div className="lg:sticky lg:top-6 lg:w-1/3 space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">My Articles</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manage and organize all your published Article in one place. Track
              performance and create new content easily.
            </p>
          </div>

          {/* article stats card */}
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
                <span>{articles?.total}</span>
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
                    <p>2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Quick Actions
            </h3>
            <div className="flex flex-col gap-2">
              <Link href={"/dashboard-user/write-article"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 cursor-pointer border border-dashed p-6"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Article</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 cursor-pointer p-6"
              >
                <Tags className="w-4 h-4" />
                <span>Manage Categories</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="lg:w-2/3 w-full">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
          </div>

          {/* Main article Display */}
          <div className="space-y-4">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-lg md:text-xl font-semibold">All Article</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-2">
                {/* Category Filter */}
                <Select>
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <Filter className="w-4 h-4" />
                    <SelectValue placeholder="category" />
                  </SelectTrigger>
                  <SelectContent className="cursor-pointer">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="sport">Sport</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="politics">Politics</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select>
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <FilterIcon className="w-4 h-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Filter */}
                <Select>
                  <SelectTrigger className="cursor-pointer w-full sm:w-40">
                    <ArrowUpDown className="w-4 h-4" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Article List */}
            {isLoading ? (
              <ArticleListSkeleton />
            ) : isEmpty ? (
              <EmptyArticleAuthor />
            ) : (
              <div className="space-y-4">
                {articles?.data?.map((article: IArticles) => (
                  <Card key={article.id} className="w-full">
                    <CardContent className="px-4 md:px-6 py-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                        {/* Left Content */}
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium truncate max-w-[200px] md:max-w-[400px]">
                              {article.title}
                            </h3>
                            <Badge
                              className={getBadgeColorStatus(
                                article.article_status
                              )}
                            >
                              {article.article_status}
                            </Badge>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground">
                            {article.article_status} on{" "}
                            {formatDateWithTime(article.created_at)}
                          </p>
                          <Badge variant="outline">{article.categories}</Badge>
                        </div>

                        {/* Right Content - Manage */}
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                className="bg-blue-500/90 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:text-neutral-50 cursor-pointer"
                                size="sm"
                              >
                                Manage
                              </Button>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-base pt-2 sm:pt-0 sm:text-lg font-semibold">
                                Choose what you want to do
                              </DialogTitle>
                              <DialogDescription className="text-sm text-muted-foreground">
                                You can edit this article before publishing
                              </DialogDescription>
                            </DialogHeader>

                            <div className="flex flex-col sm:flex-row gap-3">
                              {/* Edit Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center justify-center gap-2 bg-violet-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer flex-1"
                                size="sm"
                              >
                                <PencilLine className="size-4" />
                                <span>Edit</span>
                              </Button>

                              {/* View Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center justify-center gap-2 bg-teal-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer flex-1"
                                size="sm"
                              >
                                <Eye className="size-4" />
                                <span>View</span>
                              </Button>

                              {/* Delete Button */}
                              <Button
                                variant="ghost"
                                className="flex items-center justify-center gap-2 bg-red-500 hover:text-neutral-800 text-white dark:hover:text-neutral-50 rounded-lg px-4 py-2 transition-all cursor-pointer flex-1"
                                size="sm"
                                onClick={() => openDialog(article)}
                              >
                                <Trash2 className="size-4" />
                                <span>Delete</span>
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* {isEmpty && ( */}
            <div className="mt-8 flex justify-center">
              <PaginationComponent />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* delete confirmation dialog */}
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        onOpenChange={setIsOpenDeleteDialog}
        article={selectedArticle}
        onCancel={closeDialog}
        onConfirm={confirmDelete}
        isLoading={isLoadingDelete}
      />
    </section>
  );
}
